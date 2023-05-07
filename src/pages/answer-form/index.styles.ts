import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: rgb(245, 245, 247);

  max-width: 50rem;

  margin: 0 auto;
  padding: 20px;

  border-radius: 12px;
`;

export const Header = styled.div``;

export const Created = styled.div`
  font-size: 1.2rem;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
`;

export const AskFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: #ffffff;

  padding: 20px;

  border-radius: 16px;
`;

export const QuestionTitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

export const AnswerWrapper = styled.div``;

export const AnswerTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`;

export const Answer = styled.input``;

export const AnswerButton = styled.button``;
