// import { useEthers } from "@usedapp/core";
import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Container } from "../../shared/ui";

export const Header = () => {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <Container>
      <HeaderWrapper>
        <Logo>
          <Link to="/">Logo</Link>
        </Logo>
        {account ? (
          <Account>{account}</Account>
        ) : (
          <Button onClick={activateBrowserWallet}>Connect MetaMask</Button>
        )}
      </HeaderWrapper>
    </Container>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;

const Logo = styled.div`
  background-color: #c7c7c7;
  border: 1px dashed white;
  color: white;
  padding: 0.5rem 5rem;
  font-size: 1.25rem;
  letter-spacing: 1px;
`;

const Account = styled.p`
  color: #e75626;
  width: 10rem;
  font-size: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
