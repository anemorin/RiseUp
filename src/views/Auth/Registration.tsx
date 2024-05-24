import { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/ui/fields/TextField';
import { Button } from '../../components/ui/Button';
import {
  AuthLink, PageBody, StyledForm,
} from './AuthStyles';
import { TitleType } from '../../types';
import Title from '../../components/ui/Title';

const Registration : FC = () => {
  // const { userStore } = useStores();
  const navigate = useNavigate();
  return (
    <PageBody>
      <Title
        text="Регистрация"
        type={TitleType.PageTitle}
      />

      <Formik
        initialValues={{
          login: '', email: '', password: '', repeatPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          // userStore.Registration(values.login, values.email, values.password);
          navigate('/');
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          login: Yup.string().required('Поле обязательно для заполнения'),
          email: Yup.string().email('Некоректная почта').required('Поле обязательно для заполнения'),
          password: Yup.string().required('Поле обязательно для заполнения'),
          repeatPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Пароли должны совпадать').required('Поле обязательно для заполнения'),
        })}
      >
        {({
          isSubmitting,
        }) => (
          <StyledForm>
            <TextInput
              label="Имя пользователя"
              name="login"
            />
            <TextInput
              label="Почта"
              name="email"
            />
            <TextInput
              label="Пароль"
              name="password"
              type="password"
            />
            <TextInput
              label="Повторите пароль"
              name="repeatPassword"
              type="password"
            />
            <Button
              disabled={isSubmitting}
              text="Зарегестрироваться"
            />
          </StyledForm>
        )}
      </Formik>
      <AuthLink>
        Уже есть аккаунт?
        {' '}
        <a href="login">Войти</a>
      </AuthLink>

    </PageBody>
  );
};

export default observer(Registration);
