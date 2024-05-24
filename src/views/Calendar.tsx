import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import PageContainer from '../components/PageContainer';
import Title from '../components/ui/Title';
import { TitleType } from '../types';
import UseStores from '../hooks/useStores';
import { dayParser } from '../utils';

const PageBody = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const CalendarContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const WorkoutsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: -webkit-fill-available;
`;

const WorkoutItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  /* border: 1px solid #ccc; */
  border-radius: 12px;
  gap: 12px;
`;

const Calendar : FC = () => {
  const { workoutStore } = UseStores();
  const [currentDay, setCurrentDay] = useState<number>();
  const today = dayjs().day();

  const getWorkouts = async () => {
    if (currentDay) {
      await workoutStore.getWorkouts(currentDay);
    }
  };

  useEffect(() => {
    workoutStore.getDay();
  }, []);

  useEffect(() => {
    getWorkouts();
  }, [
    currentDay,
  ]);

  return (
    <PageContainer>
      <Title
        text="Расписание"
        type={TitleType.PageTitle}
      />
      <PageBody>
        <CalendarContainer>
          Календарик
        </CalendarContainer>
        <WorkoutsList>
          {
            workoutStore.day
              ? (
                <div>
                  {
                    workoutStore.day?.results
                      .filter((day) => day.day.includes(today))
                      .map((day) => {
                        if (day.id !== currentDay) {
                          setCurrentDay(day.id);
                        }

                        return (
                          <WorkoutItem key={day.id}>
                            <Title
                              text={`${dayParser(today)}/${day.description}:`}
                              type={TitleType.CardTitle}
                            />
                            {workoutStore.workouts ? (
                              <div>
                                {workoutStore.workouts.results
                                  .filter((workout) => workout.exerciseday === day.id)
                                  .map((workout) => (
                                    <div
                                      key={workout.id}
                                    >
                                      {workout.comment}
                                      {' '}
                                      {workout.order}
                                      {' '}
                                      подходов
                                      {' '}
                                      {workout.sets}
                                      {' '}
                                      повторений
                                    </div>
                                  ))}
                              </div>
                            ) : (<>dasdad</>)}
                          </WorkoutItem>
                        );
                      })
                  }
                </div>

              ) : (
                <div>На этот день нет ззапланированных тренировок</div>
              )
          }
        </WorkoutsList>

      </PageBody>

    </PageContainer>
  );
};

export default observer(Calendar);
