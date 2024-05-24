import { FC } from 'react';
import PageContainer from '../components/PageContainer';
import { TitleType } from '../types';
import Title from '../components/ui/Title';

const Templates: FC = () => (
  <PageContainer>
    <Title
      text="Шаблоны"
      type={TitleType.PageTitle}
    />
  </PageContainer>
);

export default Templates;
