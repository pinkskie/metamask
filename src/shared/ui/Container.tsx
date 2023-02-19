import { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}

export const Container: React.FC<IProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  max-width: calc(100% - 8rem);
  margin: 0 auto;
`;
