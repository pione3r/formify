import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 50rem;
  background-color: tomato;
`;

export const QuestionNodeWrapper = styled.div`
  width: 100px;
  height: 100px;

  background-color: yellow;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;

  user-select: none;

  z-index: 1000;
`;

export const QuestionTitleInput = styled.input`
  background-color: white;
`;

export const DragStartHandle = styled.div`
  width: 50px;
  height: 50px;

  background-color: salmon;
`;

export const AnswerPageWrapper = styled.div`
  min-height: 50rem;
  background-color: green;

  font-size: 3rem;
`;
