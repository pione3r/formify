import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 0 auto;
  padding: 20px;

  background-color: rgb(245, 245, 247);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  border: 1px solid limegreen;
`;

export const SurveyTitle = styled.input`
  font-size: 3rem;

  outline: none;
  background: none;
  border: none;
`;

export const HeaderTitle = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

export const HeaderSubTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
`;

export const HeaderContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const QuestionTypeChoiceButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 50%;

  background-color: #ffffff;

  user-select: none;

  cursor: pointer;
`;

export const BodyWrapper = styled.div`
  border: 1px solid limegreen;
`;

export const BodyTitle = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

export const BodyContentWrapper = styled.div`
  padding: 20px;

  display: flex;
  gap: 20px;

  min-height: 30rem;

  overflow: scroll;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  font-size: 3rem;
`;
