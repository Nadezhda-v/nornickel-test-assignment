import { FC } from 'react';
import cn from 'classnames';

import { IPageProps } from './Page.types';
import styles from './Page.module.scss';

const Page: FC<IPageProps> = ({ children, className }) => {
  return (
    <div className={cn('container', styles.page, className)}>
      <>{children}</>
    </div>
  );
};

export default Page;
