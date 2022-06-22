import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import * as S from './ReviewNew.styles';
import { IReviewNewUIProps } from './ReviewNew.types';
import logo from '../../../../../assets/svgs/logo/logo-icon-w.svg';
import { SyntheticEvent } from 'react';
import RatingStars from 'components/commons/stars/ratingStars/RatingStars';

export default function ReviewNewUI(props: IReviewNewUIProps) {
  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  return (
    <S.Wrap>
      <div className="info-wrap">
        <div className="image">
          <img
            src={props.MARKET_DATA?.url ? props.MARKET_DATA?.url : logo}
            onError={onErrorImg}
          />
        </div>
        <div className="info">
          <p className="title">상품 제목입니다</p>
          <p className="minidescription">상품에 대한 설명입니다</p>
        </div>
      </div>
      <form
        onSubmit={props.handleSubmit(
          props.REVIEW_DATA ? props.onClickPutReview : props.onClickPostReview,
        )}
      >
        <div className="input-wrap">
          <h1>별점 평가</h1>
          {/* <input
            type="number"
            defaultValue={props.reviewData?.score ? props.reviewData?.score : 0}
            {...props.register('score')}
          /> */}
          <RatingStars register={props.register} />
        </div>
        <div className="input-wrap">
          <h1>리뷰 작성</h1>
          <textarea
            defaultValue={
              props.REVIEW_DATA?.contents ? props.REVIEW_DATA?.contents : ''
            }
            placeholder="솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다. (최대 80자) "
            {...props.register('contents')}
            maxLength={80}
          />
        </div>

        <div className="buttons">
          <OutlinedButton01
            color="main"
            content="취소"
            onClick={props.onClickCancel}
          />
          <ContainedButton01
            color="main"
            content={props.REVIEW_DATA ? '리뷰 수정' : '리뷰 등록'}
            type="submit"
          />
        </div>
      </form>
    </S.Wrap>
  );
}