import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { FC, ReactNode } from 'react';
import { colors } from '../enums';

type Props = {
  children?: ReactNode;
  gap?: number;
}

const Page = styled.div<{gap?: number}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 36px;
  border: 4px solid ${colors.gray};
  border-radius: 16px;
  gap: ${(props) => `${props.gap}px` ?? undefined};
`;

const PageContainer: FC<Props> = ({ children, gap }) => (
  <Page
    gap={gap}
  >
    { children || <Outlet /> }
  </Page>
);

export default PageContainer;
