import React from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<IProps> = ({ children, disabled, onClick }) => {
  return (
    <MainButton disabled={disabled} onClick={onClick}>
      {children}
    </MainButton>
  );
};

const MainButton = styled.button`
  border-radius: 999rem;
  text-transform: uppercase;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1.5px;
  font-size: 1.25rem;
  background-color: #e75626;
  line-height: 120%;
  padding: 0.5rem 1.5rem;
  border: none;
  color: white;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #be3b10;
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.7;
  }
`;
