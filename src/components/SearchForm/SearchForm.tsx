import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';

import styles from './SearchForm.module.scss';
import { Input } from '../ui/Input/Input';
import { ActionButton } from '../ui/ActionButton/ActionButton';
import { Select } from '../ui/Select/Select';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { categoriesRequestAsync } from '../../store/categories/categoriesAction';
import { GoodsTable } from '../GoodsTable/GoodsTable';
import { goodsRequestAsync } from '../../store/goods/goodsAction';
import { goodsSlice } from '../../store/goods/goodsSlice';

export const SearchForm = () => {
  const [idValue, setIdValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [previousFormData, setPreviousFormData] = useState({});
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.filtredData);
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(categoriesRequestAsync());
    dispatch(goodsRequestAsync());
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value as string;
    });

    const data = Object.values(formDataObject).filter(
      (item) => item !== '',
    ).length;

    if (!isEqual(formDataObject, previousFormData)) {
      if (data) {
        dispatch(goodsSlice.actions.filterGoods(formDataObject));
      } else {
        dispatch(goodsRequestAsync());
      }

      setPreviousFormData(formDataObject);
    }
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    value = value.replace(/\D/g, '');
    setIdValue(value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    value = value.replace(/[^a-zA-Zа-яА-Я\s]/g, '');
    setNameValue(value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setTypeValue(value);
  };

  const resetForm = () => {
    setIdValue('');
    setNameValue('');
    setTypeValue('');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.filters}>
        <Input
          id='idItem'
          name='id'
          placeholder='Введите'
          label='Идентификатор:'
          value={idValue}
          onChange={handleIdChange}
          maxLength={20}
        />
        <Input
          id='nameItem'
          name='name'
          placeholder='Введите'
          label='Наименование:'
          value={nameValue}
          onChange={handleNameChange}
          maxLength={30}
        />
        {categories && (
          <Select
            id='typeItem'
            name='type'
            label='Вид товара:'
            value={typeValue}
            options={categories}
            onChange={handleTypeChange}
          />
        )}
        <div className={styles.btnWrapper}>
          <ActionButton
            type='button'
            text='Сбросить'
            className={styles.resetBtn}
            onClick={() => resetForm()}
          />
          <ActionButton type='submit' text='Найти' />
        </div>
      </div>
      <GoodsTable goods={goods} />
    </form>
  );
};
