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
import Title from '../../components/ui/Title';
import { TitleType } from '../../types';
import UseStores from '../../hooks/useStores';

const Login : FC = () => {
  const { userStore } = UseStores();
  const navigate = useNavigate();
  return (
    <PageBody>
      <Title
        text="Bход"
        type={TitleType.PageTitle}
      />

      <Formik
        initialValues={{
          login: '', password: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await userStore.Login(values.login, values.password);
          if (userStore.state?.isSuccess) {
            navigate('/');
          }
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          login: Yup.string().required('Поле обязательно для заполнения'),
          password: Yup.string().required('Поле обязательно для заполнения'),
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
              label="Пароль"
              name="password"
              type="password"
            />
            <Button
              disabled={isSubmitting}
              text="Войти"
            />
          </StyledForm>
        )}
      </Formik>
      <AuthLink>
        Ещё нет аккаунта?
        {' '}
        <a href="registration">Регистрация</a>
      </AuthLink>
    </PageBody>
  );
};

export default observer(Login);
