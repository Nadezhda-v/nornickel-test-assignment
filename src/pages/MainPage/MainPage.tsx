import React, { FC } from 'react';

import Page from '../../components/ui/layout/Page/Page';
import { SearchForm } from '../../components/SearchForm/SearchForm';

export const MainPage: FC = () => {
  return (
    <Page>
      <SearchForm />
    </Page>
  );
};
