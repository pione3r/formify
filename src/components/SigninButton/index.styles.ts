import styled, { css } from "styled-components";
import { SignInButtonProps } from "./index.types";

export const Wrapper = styled.button<Pick<SignInButtonProps, "id">>`
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

  ${(props) =>
    props.id === "kakao" &&
    css`
      background-color: #fee500;

      color: #101010;

      &:hover {
        background-color: #ffed47;
        border: 1px solid rgb(234, 234, 236);
      }
    `}
`;
