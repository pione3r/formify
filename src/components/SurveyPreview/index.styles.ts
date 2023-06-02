import styled, { keyframes } from "styled-components";

export const PreviewWrapper = styled.div`
  max-width: 640px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 100px auto;
`;

export const PreviewTitle = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

export const TitleWrapper = styled.div`
  background-color: #000000;

  padding: 12px 20px;

  border-radius: 16px;
`;

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

export const CurrentQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  background-color: #ffffff;

  padding: 20px;
  border-radius: 12px;
`;

export const CurrentQuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CurrentQuestionIndex = styled.div`
  font-size: 1.4rem;

  color: #8f8f8f;

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

export const CurrentQuestionTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

const TextInputFocusAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const CurrentQuestionTextInputWrapper = styled.div`
  width: fit-content;

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

  &:focus-within::after {
    background-color: #000000;
    height: 2px;

    animation: ${TextInputFocusAnimation} 0.2s ease-in;
  }
`;

export const CurrentQuestionTextInput = styled.input`
  font-size: 1.6rem;

  min-width: 300px;

  outline: none;
  border: none;
`;

export const CurrentQuestionOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CurrentQuestionOptionWrapper = styled.div``;

export const CurrentQuestionOptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 1.4rem;

  width: fit-content;

  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const RadioButtonCheckedAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const CurrentQuestionOptionRadioButtonInput = styled.input`
  appearance: none;

  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 20px;
  height: 20px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }

  &:checked {
    border-color: #000000;
  }

  &:checked::after {
    content: "";
    display: block;
    position: absolute;

    width: 10px;
    height: 10px;

    background-color: #000000;

    border-radius: 50%;

    animation: ${RadioButtonCheckedAnimation} 0.3s ease-in;
  }
`;

export const CurrentQuestionFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const CurrentQuestionPreviousButton = styled.button`
  width: 100%;

  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #000000;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const CurrentQuestionNextButton = styled.button`
  width: 100%;

  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #000000;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const CurrentQuestionSubmitButton = styled.button`
  width: 100%;

  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #2b44ff;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;
