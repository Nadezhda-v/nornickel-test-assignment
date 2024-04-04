import React from 'react';

import styles from './Input.module.css';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

export const Input = ({
  id,
  name,
  type,
  label,
  placeholder,
  maxLength,
  value,
  onChange,
}: IInputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
