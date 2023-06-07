import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  max-width: 140rem;

  margin: 0 auto;
  padding: 80px;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DescriptionTitle = styled.div`
  font-size: 4rem;
  font-weight: 700;
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

export const DescriptionSubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  color: #777777;

  animation: ${subTitleRiseAnimation} 0.5s ease-in;
`;

export const ExampleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 30px;

  background-color: #ffffff;

  border-radius: 12px;

  box-shadow: 0px 0px 100px #bcbcbc;
`;

export const ExampleTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const ExampleBody = styled.div`
  height: 500px;
`;
