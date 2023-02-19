import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button, PrimaryText } from "../../shared/ui";

const METAMASK_URL =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

export const Modal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(
    !Boolean(localStorage.getItem("metaModal"))
  );

  const onClose = () => {
    setShowModal(false);
    localStorage.setItem("metaModal", "true");
  };

  if (!showModal) {
    return null;
  }

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <PrimaryText>Metamask extention</PrimaryText>
        <Description>
          To work with our application, you have to <br />
          install the{" "}
          <Link
            target="_blank"
            href={METAMASK_URL}
            rel="nofollow noopener noreferrer"
          >
            Metamask browser extension
          </Link>
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
  z-index: 99999;
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

const Link = styled.a`
  color: #e75626;
`;
