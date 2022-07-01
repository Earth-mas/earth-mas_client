import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

export const MyActivityWrapper = styled.div`
  color: ${Colors.B100};
  display: flex;
  flex-direction: column;
  width: 720px;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 60px;

    svg {
      width: 34px;
      height: 34px;
    }

    h1 {
      font-size: ${FontSize.LARGE_C};
      font-weight: 400;
      margin-left: 10px;
    }
  }

  .tabMenu {
    padding-left: 80px;
    display: flex;

    .focusedTab {
      color: ${Colors.SUB1};
    }
    .submenuTab {
      cursor: pointer;
    }

    li {
      margin-right: 30px;
      margin-bottom: 10px;
      font-size: ${FontSize.MEDIUM_C};
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      :hover {
        color: ${Colors.SUB1};
      }
    }
  }

  .contentWrapper {
    margin-left: 80px;
    padding: 30px;
    width: 100%;
    border-radius: 20px;
    box-shadow: ${Colors.B20} 0 7px 16px;
    .list {
      padding: 20px 60px 20px 70px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 30px;
      grid-row-gap: 50px;
    }
  }
`;