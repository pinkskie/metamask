import { useEthers } from "@usedapp/core";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Loader } from "../assets/Loader";
import { Modal } from "../components/Modal";
import { Button, Container, Input, PrimaryText } from "../shared/ui";
import { useGetUsersQuery } from "../store/unistory/unistory-api";
import styled from "styled-components";
import { Planet } from "../assets/PlanetSVG";
import useInfiniteScroll from "react-infinite-scroll-hook";

const Home = () => {
  const { account } = useEthers();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userSubmit, setUserSubmit] = useState<boolean>(false);
  const [user, setUser] = useState<any>(
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
        <HeroSection>
          <HeroTextContent>
            <MainTextBg>
              <MainText>
                Explore your own planet <br /> in <span>our new</span> metaverse
                <Absolute>
                  <Planet />
                </Absolute>
              </MainText>
            </MainTextBg>
            <SecondaryText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </SecondaryText>
          </HeroTextContent>
          <HeroRoadmap>
            <RoadmapTitle>Roadmap stats</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>
                <PrimaryText>12, 500</PrimaryText>
                <StyledP>Lorem ipsum dolor.</StyledP>
              </RoadmapItem>
              <RoadmapItem>
                <PrimaryText>12, 500</PrimaryText>
                <StyledP>Lorem ipsum dolor.</StyledP>
              </RoadmapItem>
              <RoadmapItem>
                <PrimaryText>12, 500</PrimaryText>
                <StyledP>Lorem ipsum dolor.</StyledP>
              </RoadmapItem>
            </RoadmapList>
          </HeroRoadmap>
        </HeroSection>
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
          <TableWrapper>
            <Table cellSpacing={0}>
              <thead>
                <tr>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Wallet</TableHead>
                </tr>
              </thead>
              <TableBody>
                {userSubmit ? (
                  <TableRow>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.address}</StyledTableCell>
                    <TableCell onClick={() => setUserSubmit(false)}>
                      X
                    </TableCell>
                  </TableRow>
                ) : null}
                {data.map(({ id, username, email, address }) => (
                  <TableRow onClick={() => handleRoute(id)} key={id}>
                    <TableCell>{username}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{address}</TableCell>
                  </TableRow>
                ))}
                <TableRow ref={sentryRef}>
                  <TableCell colSpan={3} style={{ textAlign: "center" }}>
                    Loading...
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrapper>
        </RegisterSection>
      </Container>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Home;

const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8rem 0;
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  position: relative;
`;

const HeroRoadmap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
  width: 15%;
`;

const RoadmapTitle = styled.p`
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
`;

const RoadmapList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoadmapItem = styled.div`
  text-align: center;
  border-bottom: 0.5px solid #d2c4c4;
  padding: 1rem 0;
  &:last-child {
    border-bottom: none;
  }
`;

const MainTextBg = styled.div`
  /* background: url(${require("../assets/red.svg")});
  -webkit-text-fill-color: transparent;

  background-clip: text;
  -webkit-background-clip: text;
  background-repeat: no-repeat; */
`;

const MainText = styled.p`
  font-size: 9rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 6px;
  line-height: 144px;
  position: relative;

  & span {
    color: #171719;
    text-shadow: 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white;
  }
`;

const Absolute = styled.div`
  position: absolute;
  top: -50%;
  right: -2%;
  z-index: -1;
`;

const SecondaryText = styled.p`
  max-width: 25rem;
  margin-top: 2rem;
  font-family: Nunito;
`;

const StyledP = styled.p`
  text-transform: uppercase;
  font-size: 1.5rem;
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

const TableWrapper = styled.div`
  width: 55%;
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

const TableBody = styled.tbody``;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.th`
  font-size: 2rem;
  text-align: left;
  padding: 1rem 0;
`;

const TableRow = styled.tr`
  font-family: Nunito;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateX(3px);
  }
`;

const TableCell = styled.td`
  padding: 1rem 0;
  border-top: 1px solid white;
  width: 33%;
  text-overflow: ellipsis;
`;

const StyledTableCell = styled.td`
  color: #e75626;
  padding: 1rem 0;
  border-top: 1px solid white;
  width: 33%;
  text-overflow: ellipsis;
`;
