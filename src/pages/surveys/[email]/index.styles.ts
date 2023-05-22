import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 40px;

  max-width: 100rem;

  margin: 0 auto;
  padding: 20px;

  border-radius: 12px;

  background-color: rgb(245, 245, 247);
`;

export const Columm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  gap: 6px;

  padding: 20px;

  border-radius: 20px;

  background-color: rgb(245, 245, 247);
`;

export const CollectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  border-radius: 16px;

  background-color: #ffffff;
`;

export const QuestionTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Answer = styled.div`
  font-size: 1.4rem;
`;
