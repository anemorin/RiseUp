import { FC, useMemo } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Title from '../components/ui/Title';
import { TitleType } from '../types';
import UseStores from '../hooks/useStores';
import { Button } from '../components/ui/Button';
import TextInput from '../components/ui/fields/TextField';
import SelectField from '../components/ui/fields/SelectField';
import VerifiedNotification from '../components/ui/VerifiedNotification';
import { UserResponse } from '../types/UserType';

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #ccc;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Profile : FC = () => {
  const { userStore } = UseStores();

  const user = useMemo(() => ({
    ...userStore.user,
  }), [userStore.user]);

  return (
    <PageContainer>
      <Title
        text="Профиль"
        type={TitleType.PageTitle}
      />
      <ProfileCard>
        <Title
          text={user.username ?? 'Пользователь'}
          type={TitleType.CardTitle}
        />
        <VerifiedNotification
          verified={user.emailVerified ?? false}
        />
      </ProfileCard>
      <Formik
        initialValues={{
          email: user?.email,
          height: user?.height,
          age: user?.age,
          gender: user?.gender,
          birthday: user?.birthday,
          sleepHours: user.sleep_hours,
          sportHours: user.sport_hours,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await userStore.UpdateUserData({
            emailVerified: !!user.emailVerified,
            show_comments: !!user.show_comments,
            show_english_ingredients: true,
            height: values.height ?? user.height,
            age: values.age ?? user.age,
            gender: values.gender ?? user.gender,
            birthday: values.birthday ?? user.birthday,
            sleep_hours: values.sleepHours ?? user.sleep_hours,
            sport_hours: values.sportHours ?? user.sport_hours,
            work_hours: user.work_hours,
            freetime_hours: user.freetime_hours,
            workout_reminder_active: user.workout_reminder_active,
            workout_reminder: user.workout_reminder,
            workout_duration: user.workout_duration,
            ro_access: !!user.ro_access,
            num_days_weight_reminder: user.num_days_weight_reminder,
            notification_language: user.notification_language,
            calories: user.calories,
            weight_unit: user.weight_unit,
          } as UserResponse);
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          height: Yup.number().max(300, 'Вам явно ниже 3 метров').min(100, 'Вы явно выше 1 метра'),
          age: Yup.number().max(100, 'Вам явно меньше 100 лет').min(1, 'Вам явно не меньше 1 года'),
          // login: Yup.string().required('Поле обязательно для заполнения'),
          // password: Yup.string().required('Поле обязательно для заполнения'),
        })}
        enableReinitialize
      >
        {({
          isSubmitting,
        }) => (
          <CustomForm>
            <TextInput
              canEdit={false}
              label="Почта"
              name="email"
              disable
            />
            <TextInput
              label="Рост"
              name="height"
              type="number"
              disable
            />
            <TextInput
              label="Возраст"
              name="age"
              type="number"
              disable
            />
            <TextInput
              label="Дата рождения"
              name="birthday"
              type="date"
              disable
            />
            <SelectField
              label="Пол"
              name="gender"
              options={[{ label: 'Мужской', value: '1' }, { label: 'Женский', value: '0' }]}
              disable
            />
            <Button
              disabled={isSubmitting}
              text="Изменить данные"
            />
          </CustomForm>
        )}
      </Formik>
    </PageContainer>
  );
};

export default observer(Profile);
