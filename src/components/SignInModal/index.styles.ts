import styled from "styled-components";
import Image from "next/image";

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.84);

  z-index: 9000;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(245, 245, 247);

  border-radius: 12px;

  padding: 20px;
`;

export const GoogleLoginButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 16px;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  cursor: pointer;
`;

export const GoogleLogo = styled(Image)``;

export const ButtonLabel = styled.label`
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.54);

  user-select: none;

  cursor: inherit;
`;
