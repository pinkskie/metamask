import styled from "styled-components";

interface IProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<IProps> = ({ placeholder, value, onChange }) => {
  return (
    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
  );
};

const StyledInput = styled.input`
  width: 28rem;
  padding: 0.5rem 1rem;
  font-family: Nunito;
  font-size: 1rem;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 999rem;
  color: white;
  outline: none;
  transition: 0.2s;
  &:placeholder {
    font-family: Nunito;
  }
  &:focus {
    border: 1px solid #e75626;
  }
`;
