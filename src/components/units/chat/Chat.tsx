import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { LeftContainer, RightContainer, Wrapper } from './Chat.styles';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import { chat } from 'utils/APIRoutes';
import io from 'socket.io-client';
import { BeforeChat } from './BeforeChat';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import store from 'storejs';

export const Chat = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');

  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [currentChat, setCurrentChat] = useState<any>(undefined);
  const [roomid, setRoomid] = useState('');

  const queryClient = useQueryClient();
  const socketRef = useRef<any>();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인을 해주세요');
      navigate('/');
    } else {
      setCurrentUser(userInfo);
    }

    mutate();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io(`${chat}`, {
        upgrade: false,
      });
      socketRef.current.emit('userconnection', {
        roomid: currentChat?.id,
        userid: userInfo.id,
      });
    }
  }, [currentUser]);

  const { data: chatUserList, mutate } = useMutation(
    'findmychat',
    () => {
      return axios.post(`${chat}/findmychat`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    },
    {
      onSuccess: res => {
        console.log(res);
        queryClient.invalidateQueries('finduser', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const { data: clickUserId, mutate: createUserId } = useMutation(
    'finduser',
    () => {
      return axios.post(
        `${chat}/finduser`,
        {
          user:
            currentChat?.user1.id === userInfo.id
              ? currentChat?.user2.id
              : currentChat?.user1.id,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        console.log(res);
        queryClient.invalidateQueries('findmychat', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return (
    <>
      <Wrapper>
        <LeftContainer>
          <div className="user">
            <div className="userImg">
              <img
                src={userInfo.url}
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p className="userName">{userInfo.name}</p>
          </div>

          <ChatList
            setCurrentChat={setCurrentChat}
            chatUserList={chatUserList}
            setRoomid={setRoomid}
            createUserId={createUserId}
          />
        </LeftContainer>

        <RightContainer>
          {currentChat === undefined ? (
            <BeforeChat />
          ) : (
            <>
              <div className="user">
                <div className="userImg">
                  <img
                    src={clickUserId?.data[0]?.url}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
                <p className="userName">{clickUserId?.data[0]?.name}</p>
              </div>

              <ChatContainer
                currentChat={currentChat}
                chatUserList={chatUserList}
                roomid={roomid}
                socketRef={socketRef}
              />
            </>
          )}
        </RightContainer>
      </Wrapper>
    </>
  );
};
