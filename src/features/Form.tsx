import { useState } from "react";
import { useEthers } from "@usedapp/core";
import styled from "styled-components";

import { Button, Input, PrimaryText } from "../shared/ui";
import { IUser } from "../app/store/types";

interface IProps {
  user: Omit<IUser, "id">;
  onSave(user: Omit<IUser, "id">): void;
  disabled: boolean;
  handleSubmit(): void;
}

const SubmitUser: React.FC<Omit<IProps, "onSave">> = ({
  user,
  disabled,
  handleSubmit,
}) => (
  <RegisterForm>
    <RegisterLabel>Name</RegisterLabel>
    <PrimaryText>{user.username}</PrimaryText>
    <RegisterLabel>Email</RegisterLabel>
    <PrimaryText>{user.email}</PrimaryText>
    <ButtonPosition>
      <Button onClick={handleSubmit} disabled={disabled}>
        List me to the table
      </Button>
    </ButtonPosition>
  </RegisterForm>
);

export const Form: React.FC<IProps> = ({
  user,
  onSave,
  handleSubmit,
  disabled,
}) => {
  const { account } = useEthers();
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSave = () => {
    const newUser: Omit<IUser, "id"> = {
      username,
      email,
      address: account || "",
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    onSave(newUser);
  };

  return (
    <div>
      <PrimaryText>Beta test registration</PrimaryText>
      <SecondaryText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{" "}
      </SecondaryText>
      {Object.keys(user).length ? (
        <SubmitUser
          user={user}
          handleSubmit={handleSubmit}
          disabled={disabled}
        />
      ) : (
        <RegisterForm>
          <RegisterLabel>Name</RegisterLabel>

          <Input
            placeholder="We will display your name in participation list "
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
          <RegisterLabel>Email</RegisterLabel>
          <Input
            placeholder="We will display your name in participation list "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ButtonPosition>
            <Button onClick={handleSave} disabled={!account}>
              Get early access
            </Button>
          </ButtonPosition>
        </RegisterForm>
      )}
    </div>
  );
};

const SecondaryText = styled.p`
  max-width: 25rem;
  margin-top: 2rem;
  font-family: Nunito;
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
