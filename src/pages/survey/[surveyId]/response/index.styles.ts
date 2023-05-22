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

export const HeaderWrapper = styled.div``;

export const HeaderTitle = styled.div`
  font-size: 3rem;
  font-weight: 800;
`;

export const BodyWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

export const QuestionWrapper = styled.div<{ isCurrentQuestion: boolean }>`
  display: ${(props) => (props.isCurrentQuestion ? "block" : "none")};

  border: 1px solid limegreen;
`;

export const QuestionHeaderWrapper = styled.div``;

export const QuestionTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const QuestionBodyWrapper = styled.div``;

export const InputLabel = styled.label`
  font-size: 2rem;
  font-weight: 600;
`;

export const TextInput = styled.input`
  font-size: 1.6rem;
`;

export const OptionsWrapper = styled.div``;

export const OptionWrapper = styled.div``;

export const OptionInput = styled.input``;

export const OptionLabel = styled.label``;

export const QuestionFooterWrapper = styled.div``;

export const PreviousButton = styled.button`
  font-size: 3rem;
`;

export const NextButton = styled.button`
  font-size: 3rem;
`;

export const SubmitButton = styled.button`
  font-size: 3rem;
`;

export const FooterWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const FooterHeaderWrapper = styled.div``;

export const FooterTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const FooterBodyWrapper = styled.div``;
