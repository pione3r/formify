import styled, { keyframes } from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px;

  max-width: 1280px;

  margin: 0 auto;
  margin-top: 50px;
`;

export const HeaderWrapper = styled.div``;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
`;

const subTitleRiseAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const SubTitle = styled.h3`
  font-size: 3rem;
  font-weight: 400;
  color: #777777;

  animation: ${subTitleRiseAnimation} 0.5s ease-in;
`;

export const Video = styled.video`
  padding: 20px;

  object-fit: contain;

  box-shadow: rgb(0 0 0 / 12%) 6px 8px 16px;
`;
