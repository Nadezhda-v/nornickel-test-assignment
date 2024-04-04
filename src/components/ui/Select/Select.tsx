import React from 'react';

import styles from './Select.module.scss';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label?: string;
  options: string[];
}

export const Select = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
}: ISelectProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        className={styles.select}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value=''>Выберите</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
