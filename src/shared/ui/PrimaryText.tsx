import React from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const PrimaryText: React.FC<IProps> = ({ children }) => {
  return <Primary>{children}</Primary>;
};

const Primary = styled.p`
  font-size: 2rem;
  text-transform: uppercase;
  color: #e75626;
  letter-spacing: 1px;
`;
