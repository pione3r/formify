import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 50rem;
  background-color: tomato;
`;

export const QuestionNodeWrapper = styled.div`
  width: 200px;
  height: 200px;

  border: 1px solid limegreen;
  border-radius: 16px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;

  z-index: 1000;

  user-select: none;
`;

export const QuestionTitleInput = styled.input`
  background-color: white;
`;

export const DragStartHandle = styled.div`
  width: 30px;
  height: 30px;

  background-color: #ffffff;

  border: 1px solid limegreen;
  border-radius: 50%;

  position: absolute;
  right: -50px;

  cursor: pointer;
`;

export const OptionsWrapper = styled.div`
  position: absolute;
  top: 220px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

export const OptionWrapper = styled.div`
  background-color: #ffffff;

  border: 1px solid limegreen;
  border: 12px;

  display: flex;
  align-items: center;
`;

export const OptionTitle = styled.div``;

export const OptionDragStartHandler = styled.div`
  width: 10px;
  height: 10px;

  background-color: #ffffff;

  border: 1px solid limegreen;
  border-radius: 50%;

  position: absolute;
  right: -20px;

  cursor: pointer;
`;

export const AnswerPageWrapper = styled.div`
  min-height: 50rem;
  background-color: green;

  font-size: 3rem;
`;
