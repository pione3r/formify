import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: #ffffff;

  margin: 20px;
  padding: 20px;

  border-radius: 20px;

  user-select: none;
`;

export const Index = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: rgb(152 152 152);

  &::after {
    content: "";

    display: block;
    width: 100%;
    height: 2px;

    margin-top: 4px;

    border: 1px solid rgb(245, 245, 247);
  }
`;

export const Title = styled.input`
  display: block;

  font-size: 1.8rem;
  font-weight: 500;
  color: #212529;

  resize: none;
  outline: none;
  border: none;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;

  padding: 6px;

  border-radius: 50%;

  background-color: rgb(191 191 191);

  cursor: pointer;

  transition: 200ms ease;

  &:hover {
    background-color: rgb(207 203 203);
  }
`;

export const DeleteButtonIcon = styled(Image)`
  object-fit: contain;
`;
