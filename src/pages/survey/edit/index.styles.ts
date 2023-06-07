import Link from "next/link";
import styled, { keyframes } from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;

  padding: 10px 40px;

  position: sticky;
  top: 0px;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.72);

  z-index: 2000;
`;

export const HeaderLogo = styled(Link)`
  font-size: 3rem;
  font-weight: 700;
  color: #000000;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const TextInputFocusAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const SurveyTitleInputWrapper = styled.div`
  margin-top: 4px;
  margin-left: 50px;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #8f8f8f;
  }

  &:focus-within::after {
    background-color: #000000;
    height: 2px;

    animation: ${TextInputFocusAnimation} 0.2s ease-in;
  }
`;

export const SurveyTitleInput = styled.input`
  width: 100%;

  font-size: 2.5rem;

  outline: none;
  background: none;
  border: none;
`;

export const SubmitButton = styled.button`
  margin-left: auto;

  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;

  background-color: #2b44ff;

  padding: 10px 16px;

  border-radius: 16px;

  cursor: pointer;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const Body = styled.div`
  display: flex;
  gap: 60px;

  max-width: 160rem;
  height: 800px;

  margin: 0 auto;
  padding: 50px;
`;

export const SurveyFlowWrapper = styled.div`
  min-width: 900px;

  background-color: #ffffff;
`;
