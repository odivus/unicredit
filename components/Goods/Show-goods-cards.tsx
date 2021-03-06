import React from 'react';
import GoodsCard from '../Goods-card/Goods-card';
import GoodsAdded from '../../Interfaces/Goods-added';

interface Props {
  goodsAdded: Array<GoodsAdded>;
  userGoodsAdded: number;
  setGoodsAdded: (state: {
    id: string,
    selected_goods: GoodsAdded,
  }) => void;
  setGoodsPriceSum: (state: number) => void;
}

function ShowGoodsCards(props: any) {
  const {
    goodsAdded, 
    userGoodsAdded, 
    setGoodsAdded,
    setGoodsPriceSum
  } = props;

  return <>{
    goodsAdded
      .map((goodsItem, index) => (
        <GoodsCard
          key={goodsItem._id}
          {...{
            goodsAddedIndex: index + 1,
            ...goodsItem,
            index,
            goodsAdded,
            userGoodsAdded,
            setGoodsAdded,
            setGoodsPriceSum,
          }}
        />)
      )
      .reverse()
    }</>
}

export default ShowGoodsCards;