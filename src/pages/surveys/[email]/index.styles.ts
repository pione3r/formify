import styled, { css, keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: 60rem;

  margin: 100px auto;

  border-radius: 12px;

  background-color: rgb(245, 245, 247);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: #000000;

  padding: 20px;

  border-radius: 16px;
`;

export const TitleWrapper = styled.div``;

export const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;

  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0px;

    width: 100%;
    height: 0.5px;

    margin-top: 3px;

    background-color: #8f8f8f;
  }
`;

export const ViewWaysNavBar = styled.div`
  display: flex;
  gap: 10px;
`;

const viewWayButtonAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const ViewWayButton = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 1.4rem;
  font-weight: 700;
  color: #dddddd;

  position: relative;
  width: 100%;

  padding: 10px 20px;

  border-radius: 10px;

  &:hover {
    cursor: pointer;

    background-color: #575757d4;
  }

  ${(props) =>
    props.isClicked &&
    css`
      color: #ffffff;

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;

        background-color: #ffffff;

        margin-top: 6px;

        animation: ${viewWayButtonAnimation} 0.2s ease-in;
      }
    `}
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: #ffffff;

  padding: 20px;

  border-radius: 16px;
`;

export const Respondent = styled.div`
  font-size: 1.4rem;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  border-radius: 20px;

  background-color: rgb(245, 245, 247);
`;

export const QuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const QuestionTitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

export const Answer = styled.div`
  font-size: 1.4rem;

  background-color: #ffffff;

  padding: 14px;

  border-radius: 12px;
`;

export const SummaryWrapper = styled.div``;

export const CollectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  border-radius: 16px;

  background-color: #ffffff;
`;

export const AnswersCount = styled.div`
  font-size: 1.3rem;
`;
