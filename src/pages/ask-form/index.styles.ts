import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  gap: 20px;

  max-width: 130rem;

  margin: 0 auto;
  padding: 20px;

  background-color: rgb(245, 245, 247);
`;

export const QuestionFormBoardWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;
  border-radius: 12px;

  background-color: #ffffff;
`;

export const QuestionFormBoardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const QuestionFormBoardBody = styled.div`
  min-height: 30rem;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  background-color: rgb(217 217 217);

  border-radius: 16px;
`;

export const SubmitButton = styled.button``;
