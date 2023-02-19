import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { IUser } from "../app/store/types";

interface Props {
  data: IUser[];
  isAdded: boolean;
  user: Omit<IUser, "id">;
  onDelete(): void;
}

export const DataTable = forwardRef<HTMLTableRowElement, Props>(
  ({ data = [], user = {}, onDelete, isAdded = false }, sentryRef) => {
    const navigate = useNavigate();
    const handleRoute = (id: number) => navigate(`/user/${id}`);

    return (
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
              {isAdded ? (
                <TableRow disabled>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>
                    <Ellipsed>{user.address}</Ellipsed>
                    <DeleteButton onClick={onDelete}>X</DeleteButton>
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
    );
  }
);

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
