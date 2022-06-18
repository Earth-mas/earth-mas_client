import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import DatePicker01 from 'components/commons/datePicker';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
} from 'react';

interface IActivityNewUIProps {
  onChangeTitle: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  //   onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (
    date: Date | null,
    event: SyntheticEvent<unknown, Event> | undefined,
  ) => void;
  onChangeHeadCount: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChangeLocation: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChangeSubDescription: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeEditor: (e: SetStateAction<undefined>) => void;
  onClickSubmit: (arg0: FormEvent<HTMLFormElement>) => void;
  date: Date | null | undefined;
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
}

export default function ActivityNewUI(props: IActivityNewUIProps) {
  return (
    <Wrap>
      <Title01 content="액티비티 등록" margin={35} size="C" />
      <form onSubmit={props.onClickSubmit}>
        <Input01
          id="title"
          type="text"
          placeholder="액티비티의 이름을 입력해주세요"
          margin={25}
          onChange={props.onChangeTitle}
        />

        <ColumnWrap>
          <Dropdown01 page={1} />
          <DatePicker01
            onChangeDate={props.onChangeDate}
            date={props.date}
            name={'dday'}
          />
          {/* 달력 보여지는 위치 조정해주기 */}
          {/* 토, 일 색깔 적용하기 */}
        </ColumnWrap>

        <ColumnWrap>
          <Input01
            type="text"
            placeholder="활동 위치를 입력해주세요 (ex. 서울시 중구)" // nightmare로 위치 gps 적용해보기
            margin={25}
            onChange={props.onChangeLocation}
          />

          <Input01
            type="number"
            placeholder="모집 인원"
            pattern="[0-9]+"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$0');"
            onChange={props.onChangeHeadCount}
          />
          {/* <div className="PlusMinus">
              <MinusIcon style={{ cursor: 'pointer' }} onClick={onClickMinus} />
              {count}
              <PlusIcon style={{ cursor: 'pointer' }} onClick={onClickPlus} />
            </div> */}
          {/* </div> */}
          {/* nightmare로 + - 증감 인원 input창에 적용시켜보기 */}
        </ColumnWrap>

        <Input01
          type="text"
          placeholder="필요한 준비물을 입력해주세요(예: 멀쩡한 팔다리, 쓰레기 봉투, 집게, 장갑, 썬크림)"
          margin={25}
          onChange={props.onChangeSubDescription}
        />

        <Upload01 page="activity" urls={props.urls} setUrls={props.setUrls} />
        <Blank height={25} />
        <QuillEditor page={1} onChange={props.onChangeEditor} />
        <Blank height={60} />
        <div className="buttonWrap">
          <ContainedButton01
            content="액티비티 등록"
            color="main"
            type="button"
            //   onClick={props.onClickSubmit}
          />
        </div>
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 30px 0px 100px 0px;

  .buttonWrap {
    width: 20%;
    display: flex;
    justify-content: center;
    margin: auto;
  }
`;

const ColumnWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 25px;
`;