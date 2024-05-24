import { FC, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import NavigationBar from './NavigationBar';
import UseStores from '../hooks/useStores';

const MainPageContainer = styled.div`
  display: flex;
  height:  100%;
  width: 100%;
  padding: 12px;
  gap: 24px;
`;

const MainLayout : FC = () => {
  const { userStore } = UseStores();
  const navigate = useNavigate();
  const jwtUpdateIntervalId = useRef<NodeJS.Timer | null>(null);

  const startJwtUpdateInterval = () => {
    jwtUpdateIntervalId.current = setInterval(() => {
      userStore.UpdateToken();
    }, 5 * 60 * 1000); // 2 minutes in milliseconds
  };

  const stopJwtUpdateInterval = () => {
    if (jwtUpdateIntervalId.current) {
      // clearInterval(jwtUpdateIntervalId.current);
      jwtUpdateIntervalId.current = null;
    }
  };

  useEffect(() => {
    if (userStore.token) {
      userStore.UpdateToken();
      startJwtUpdateInterval();
    }
    return () => {
      stopJwtUpdateInterval();
    };
  }, []);

  useEffect(() => {
    if (userStore.token) {
      userStore.getUserData();
    }
  }, [userStore.token]);

  useEffect(() => {
    if (!userStore.token) {
      navigate('/auth/login');
    }
  }, [userStore.token]);

  return (
    <MainPageContainer>
      <NavigationBar />
      <Outlet />
    </MainPageContainer>
  );
};

export default observer(MainLayout);
