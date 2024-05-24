import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  verified: boolean;
}

const Container = styled.div<{verified: boolean}>`
  padding: 8px;
  background-color: ${(props) => (props.verified ? 'green' : 'red')};
  color: white;
  border-radius: 8px;
`;

const VerifiedNotification : FC<Props> = ({ verified }) => (
  <Container
    verified={verified}
  >
    {verified ? 'Verified' : 'Not Verified'}
  </Container>
);

export default VerifiedNotification;
