import styled from '@emotion/styled';
import ActivityCard from 'components/commons/card/activity/ActivityCard';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Title01 from 'components/commons/text/title/Title01';
import Input02 from 'components/commons/inputs/Input02';
import Category from 'components/commons/category/Category';
import { activityRoute } from 'utils/APIRoutes';
import _ from 'lodash';
import { IActivityList } from './ActivityList.types';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Pagination from 'components/commons/pagination';
import { useQuery } from 'react-query';
import SearchList from './searchList/searchList';
import CategoryList from './categoryList/CategoryList';

export default function ActivityList() {
  const [nowCategory, setNowCategory] = useState('전체');
  const [select, setSelect] = useState<string>('finddcs');
  const [clickPage, setClickPage] = useState(1);

  const [keyword, setKeyword] = useState('');

  const [activityListData, setActivityListData] = useState<IActivityList[]>();
  const [searchList, setSearchList] = useState<boolean>(false);

  // 액티비티 리스트
  // const getActivityListData = async () => {
  //   await axios
  //     .post(`https://earth-mas.shop/server/activity/${select}`, {
  //       category: nowCategory,
  //       page: clickPage,
  //     })
  //     .then(res => {
  //       setActivityListData(res.data.arr);
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // 검색 기능
  const getDebounce = _.debounce(data => {
    setKeyword(data);
    setSearchList(true);
  }, 500);

  const onSearch = async () => {
    await axios
      .post(`${activityRoute}/search`, { search: keyword })
      .then(res => {
        setActivityListData(res.data);
        // return setActivityListData(res.data);
        console.log('searchData:', res.data);
      })
      .catch(err => {
        console.log('검색에러:', err);
      });
  };
  const onchangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  };

  useEffect(() => {
    onSearch();
  }, [keyword]);

  // 액티비티 리스트
  const { data: listData, refetch } = useQuery(
    ['activityList', clickPage],
    async () => {
      const getList = await axios.post(`${activityRoute}/${select}`, {
        category: nowCategory,
        page: clickPage,
      });
      setActivityListData(getList.data.arr);
      console.log('액티비티리스트:', getList);
      return getList.data;
    },
    { keepPreviousData: true },
  );

  useEffect(() => {
    refetch();
    setClickPage(1);
    setSearchList(false);
    // getActivityListData();
  }, [nowCategory, select]);

  console.log('activityList: ', activityListData);
  console.log('searchList:', searchList);

  return (
    <>
      <Wrap>
        <section>
          <div className="search">
            <Input02
              placeholder="검색어를 입력해주세요"
              onChange={onchangeSearch}
            />
          </div>
          <Category page={1} setNowCategory={setNowCategory} />
        </section>
        <section>
          {searchList && searchList ? (
            <SearchList activityListData={activityListData} />
          ) : (
            <CategoryList
              activityListData={activityListData}
              nowCategory={nowCategory}
              setSelect={setSelect}
              clickPage={clickPage}
              setClickPage={setClickPage}
              listData={listData}
              refetch={refetch}
            />
          )}
          {/* {!searchList && (
            <CategoryList
              activityListData={activityListData}
              nowCategory={nowCategory}
              setSelect={setSelect}
              clickPage={clickPage}
              setClickPage={setClickPage}
              listData={listData}
              refetch={refetch}
            />
          )}
          {searchList && <SearchList activityListData={activityListData} />} */}
        </section>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  .search {
    display: flex;
    justify-content: end;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 27px;
`;
