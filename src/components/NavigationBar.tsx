import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Splitter from './ui/Splitter';
import { colors } from '../enums';
import UseStores from '../hooks/useStores';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 12px;
`;

const StyledLink = styled(NavLink)`
  padding: 20px;
  width: 100%;
  background-color: ${colors.gray};
  border-radius: 6px;
  text-decoration: none;
  color: ${colors.black};
  font-size: 22px;

  &.active {
    background-color: ${colors.black};
    color: ${colors.white};
    img {
      filter: grayscale(1) brightness(1000%);
    }
  }
`;

const NavigationBar: FC = () => {
  const { userStore } = UseStores();
  return (
    <Container>
      <StyledLink
        to="/"
      >
        {userStore.user?.username}
      </StyledLink>
      <Splitter />
      <StyledLink
        to="/Calendar"
      >
        Расписание
      </StyledLink>
      <StyledLink
        to="/Workouts"
      >
        Тренировки
      </StyledLink>
      <StyledLink
        to="/Templates"
      >
        Шаблоны
      </StyledLink>
    </Container>
  );
};

export default observer(NavigationBar);
