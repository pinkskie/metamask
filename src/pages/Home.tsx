import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Modal } from "../components/Modal";
import { Button, Container, Input, PrimaryText } from "../shared/ui";
import { useGetUsersQuery } from "../store/unistory/unistory-api";
import { HeroSection } from "../sections/Home/HeroSection";
import { Loader } from "../assets/Loader";
import styled from "styled-components";

const Home = () => {
  const { account } = useEthers();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userSubmit, setUserSubmit] = useState<boolean>(false);
  const [user, setUser] = useState<any>( // Omit<IUser, id>
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const [page, setPage] = useState(0);
  const { data = [], isFetching, isLoading, isError } = useGetUsersQuery(page);

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: true,
    onLoadMore: () => setPage((p) => p + 1),
    disabled: isError,
    rootMargin: "0px 0px 400px 0px",
  });

  const navigate = useNavigate();

  const handleRoute = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handleAccess = () => {
    const newUser = {
      name,
      email,
      address: account,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const submitUser = () => {
    return (
      <RegisterForm>
        <RegisterLabel>Name</RegisterLabel>
        <PrimaryText>{user.name}</PrimaryText>
        <RegisterLabel>Email</RegisterLabel>
        <PrimaryText>{user.email}</PrimaryText>
        <ButtonPosition>
          <Button onClick={() => setUserSubmit(true)} disabled={userSubmit}>
            List me to the table
          </Button>
        </ButtonPosition>
      </RegisterForm>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container>
        <HeroSection />
        <RegisterSection>
          <div>
            <PrimaryText>Beta test registration</PrimaryText>
            <SecondaryText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </SecondaryText>
            {Object.keys(user).length ? (
              submitUser()
            ) : (
              <RegisterForm>
                <RegisterLabel>Name</RegisterLabel>

                <Input
                  placeholder="We will display your name in participation list "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <RegisterLabel>Email</RegisterLabel>
                <Input
                  placeholder="We will display your name in participation list "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ButtonPosition>
                  <Button onClick={() => handleAccess()} disabled={!account}>
                    Get early access
                  </Button>
                </ButtonPosition>
              </RegisterForm>
            )}
          </div>
          <div style={{ width: "55%" }}>
            <TableTitle>
              Participation listing (enable only for participants)
            </TableTitle>
            <TableWrapper>
              <table cellSpacing={0}>
                <THeadWrapper>
                  <tr>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Wallet</TableHead>
                  </tr>
                </THeadWrapper>
                <tbody>
                  {userSubmit ? (
                    <TableRow disabled>
                      <StyledTableCell>{user.name}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>
                        <Ellipsed>{user.address}</Ellipsed>
                        <DeleteButton onClick={() => setUserSubmit(false)}>
                          X
                        </DeleteButton>
                      </StyledTableCell>
                    </TableRow>
                  ) : null}
                  {data.map(({ id, username, email, address }) => (
                    <TableRow onClick={() => handleRoute(id)} key={id}>
                      <TableCell>{username}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        <Ellipsed>{address}</Ellipsed>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow ref={sentryRef}>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      Loading...
                    </TableCell>
                  </TableRow>
                </tbody>
              </table>
            </TableWrapper>
          </div>
        </RegisterSection>
      </Container>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Home;

const SecondaryText = styled.p`
  max-width: 25rem;
  margin-top: 2rem;
  font-family: Nunito;
`;

const RegisterSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 4rem;
`;

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const RegisterLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const ButtonPosition = styled.div`
  align-self: flex-start;
  margin-top: 2rem;
`;

const TableTitle = styled.p`
  font-weight: 700;
  font-size: 2.25rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 36.5rem;
  overflow-y: scroll;
  padding-right: 2rem;
  &::-webkit-scrollbar {
    background: white;
  }
  &::-webkit-scrollbar {
    border: 2px solid #171719;
  }
`;

const THeadWrapper = styled.thead`
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: #171719;
`;

const TableHead = styled.th`
  font-size: 2rem;
  text-align: left;
  padding: 1rem 0;
`;

const TableRow = styled.tr<{ disabled?: boolean }>`
  font-family: Nunito;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
  transition: all 0.2s;
  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateX(3px)")};
  }
`;

const TableCell = styled.td`
  padding: 1rem 0;
  border-top: 1px solid white;
  width: 25%;
  text-overflow: ellipsis;
`;

const Ellipsed = styled.p`
  width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTableCell = styled.td`
  color: #e75626;
  padding: 1rem 0;
  border-top: 1px solid white;
  width: 25%;
  text-overflow: ellipsis;
  position: relative;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  position: absolute;
  right: 0;
  border-radius: 100%;
  padding: 0.1rem;
  top: 0.8rem;
  padding: 0.3rem;
`;
