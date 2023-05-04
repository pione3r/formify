import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  position: relative;

  min-width: 50rem;

  background-color: #ffffff;

  padding: 10px;

  border-radius: 20px;

  cursor: pointer;
  user-select: none;

  transition: all 0.2s ease-in-out 0s;

  &:hover {
    box-shadow: rgb(0 0 0 / 12%) 6px 8px 16px;
    transform: translateY(-2px);
  }

  &:hover #delete-button {
    visibility: visible;
  }
`;

export const DragHandle = styled(Image)`
  display: flex;
  justify-content: center;

  width: 100%;

  object-fit: contain;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;

  padding: 6px;

  border-radius: 50%;

  background-color: rgb(191 191 191);

  cursor: pointer;

  visibility: hidden;

  &:hover {
    background-color: rgb(207 203 203);
  }
`;

export const DeleteButtonIcon = styled(Image)`
  object-fit: contain;
`;
