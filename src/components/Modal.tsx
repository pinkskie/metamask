import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Button, PrimaryText } from "../shared/ui";

interface IProps {
  onClose: () => void;
}

export const Modal: React.FC<IProps> = ({ onClose }) => {
  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <PrimaryText>Metamask extention</PrimaryText>
        <Description>
          To work with our application, you have to <br />
          install the
          <Link to="#"> Metamask browser extension</Link>
        </Description>
        <Button onClick={onClose}>Skip this stem</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

const opacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 0.5s ${opacity} ease-out;
`;
const ModalContent = styled.div`
  background-color: #262628;
  padding: 3rem;
  color: black;
  text-align: center;
`;

const Description = styled.p`
  display: block;
  color: white;
  font-family: "Nunito";
  margin-top: 2rem;
  margin-bottom: 3rem;
`;
