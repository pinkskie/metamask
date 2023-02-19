import { useState } from "react";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Container } from "../shared/ui";
import { useGetUsersQuery } from "../app/store/unistory-api";
import { HeroSection } from "../widgets/HeroSection";
import { Loader } from "../shared/assets/Loader";
import { IUser } from "../app/store/types";
import { DataTable, Form } from "../features";

const localUser = JSON.parse(localStorage.getItem("user") || "{}");

const Home = () => {
  const [userSubmit, setUserSubmit] = useState<boolean>(
    !!Object.keys(localUser).length
  );
  const [user, setUser] = useState<Omit<IUser, "id">>(localUser);
  // Fetch
  const [page, setPage] = useState(0);
  const { data = [], isFetching, isLoading, isError } = useGetUsersQuery(page);

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: true,
    onLoadMore: () => setPage((p) => p + 1),
    disabled: isError,
    rootMargin: "0px 0px 400px 0px",
  });

  const handleDelete = () => {
    setUserSubmit(false);
    localStorage.removeItem("user");
    // @ts-ignore
    setUser({});
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container>
        <HeroSection />
        <RegisterSection>
          <Form
            user={user}
            onSave={setUser}
            handleSubmit={() => setUserSubmit(true)}
            disabled={userSubmit}
          />
          <DataTable
            data={data}
            user={user}
            ref={sentryRef}
            isAdded={userSubmit}
            onDelete={handleDelete}
          />
        </RegisterSection>
      </Container>
    </>
  );
};

export default Home;

const RegisterSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 4rem;
`;
