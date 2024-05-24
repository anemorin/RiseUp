import { FC, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import Title from '../components/ui/Title';
import { TitleType } from '../types';
import UseStores from '../hooks/useStores';

const Workouts: FC = () => {
  const { workoutStore } = UseStores();

  useEffect(() => {
    workoutStore.getDay();
  }, []);

  return (
    <PageContainer>
      <Title
        text="Тренировки"
        type={TitleType.PageTitle}
      />
    </PageContainer>
  );
};
export default Workouts;
