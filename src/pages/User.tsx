import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loader } from "../assets/Loader";
import { Container, PrimaryText } from "../shared/ui";
import { useGetUserByIdQuery } from "../store/unistory/unistory-api";

export default function User() {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(parseInt(id || "0", 10));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          <UserInfo>
            <Title>Personal Data</Title>
            <div>
              <UserLabel>Name</UserLabel>
              <PrimaryText>{data?.username}</PrimaryText>
            </div>
            <div>
              <UserLabel>Email</UserLabel>
              <PrimaryText>{data?.email}</PrimaryText>
            </div>
            <div>
              <UserLabel>wallet</UserLabel>
              <PrimaryText>{data?.address}</PrimaryText>
            </div>
            <PlanetImage>
              <img src={require("../assets/nonAnimated.png")} alt="ok" />
            </PlanetImage>
          </UserInfo>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 4rem;
  position: relative;
  overflow: hidden;
  height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  width: 100%;
`;

const UserLabel = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const PlanetImage = styled.div`
  width: fit-content;
  position: absolute;
  right: -18rem;
  top: -7rem;
`;
