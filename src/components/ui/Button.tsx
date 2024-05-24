import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
}

const ButtonContainer = styled.button`
  padding: 12px;
  /* width: 80%; */
  max-width: 500px;
  background-color: black;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const Button: FC<Props> = ({ onClick, disabled, text }) => (
  <ButtonContainer
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </ButtonContainer>
);
