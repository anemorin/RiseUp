import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const PageBody = styled.div`
  width: 100%;
  height: 100%;
`;

const PageLayout = () => (
  <PageBody>
    <Outlet />
  </PageBody>
);

export default PageLayout;
