import React, { useEffect, useState } from 'react';

import styles from './GoodsTable.module.scss';
import goodsTableJson from '../../assets/goodsTable.json';
import { useAppSelector } from '../../hooks/hook';
import { Preloader } from '../ui/Preloader/Preloader';
import { getCountItems } from '../../utils/getCountItems';

interface Item {
  id: number;
  name: string;
}

export interface CategoryItem {
  type: string;
  items: Array<Item>;
}

interface GoodsTableProps {
  goods: CategoryItem[];
}

export const GoodsTable = ({ goods }: GoodsTableProps) => {
  const isLoading = useAppSelector((state) => state.goods.loading);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const newCount = getCountItems(goods);

    setCount(newCount);
  }, [goods]);

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        {isLoading && <Preloader color='#76a1f6' size={30} />}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {goodsTableJson.head.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`${styles.tbody}${
              isLoading ? ` ${styles.loading}` : ''
            }`}
          >
            {count ? (
              goods.map(({ type, items }) =>
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{type}</td>
                  </tr>
                )),
              )
            ) : (
              <tr>
                <td colSpan={3}>По вашему запросу товаров не найдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
