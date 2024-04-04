import { CategoryItem } from '../components/GoodsTable/GoodsTable';

export const getCountItems = (goods: CategoryItem[]) =>
  goods.reduce((acc, current) => acc + current.items.length, 0);
