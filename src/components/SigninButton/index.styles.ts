import styled from "styled-components";

export const Wrapper = styled.button`
  padding: 10px 12px;

  background-color: rgb(255, 255, 255);

  border: 1px solid rgb(234, 234, 236);
  border-radius: 20px;

  font-size: 1.4rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: rgb(246, 246, 248);
    color: rgb(0, 0, 0);
    border: 1px solid rgb(234, 234, 236);
  }
`;
