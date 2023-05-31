import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 50rem;

  background-color: tomato;

  position: relative;
`;

export const QuestionNodeWrapper = styled.div<{ style: any }>`
  width: 200px;
  height: 200px;

  border-radius: 16px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  margin: 20px;

  z-index: 1000;

  user-select: none;
`;

export const QuestionTitleInput = styled.input`
  background-color: white;
`;

export const ConnectStartHandle = styled.div`
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

export const OptionTitleInput = styled.input``;

export const OptionConnectStartHandle = styled.div`
  width: 10px;
  height: 10px;

  background-color: #ffffff;

  border: 1px solid limegreen;
  border-radius: 50%;

  position: absolute;
  right: -20px;

  cursor: pointer;
`;

export const PreviewWrapper = styled.div`
  min-height: 50rem;
  background-color: green;

  font-size: 3rem;
`;

export const CurrentQuestionWrapper = styled.div``;

export const CurrentQuestionTitle = styled.div``;

export const CurrentQuestionAnswerInput = styled.input``;

export const PreviousQuestionButton = styled.button``;
