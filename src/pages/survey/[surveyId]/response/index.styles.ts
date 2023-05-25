import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: 640px;

  margin: 0 auto;
  padding: 20px;
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

export const BodyWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

export const QuestionWrapper = styled.div<{ isCurrentQuestion: boolean }>`
  display: ${(props) => (props.isCurrentQuestion ? "flex" : "none")};
  flex-direction: column;
  gap: 30px;

  background-color: #ffffff;

  padding: 20px;
  border-radius: 12px;

  width: 100%;
`;

export const QuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const QuestionIndex = styled.div`
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

export const QuestionTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const QuestionBodyWrapper = styled.div``;

const TextInputFocusAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const TextInputWrapper = styled.div`
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

export const TextInput = styled.input`
  font-size: 1.6rem;

  min-width: 300px;

  outline: none;
  border: none;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OptionWrapper = styled.div``;

export const OptionLabel = styled.label`
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

export const CheckBoxCheckedAnimation = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const CheckBoxUnCheckedAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
`;

export const CheckBoxMark = styled.div`
  width: 18px;
  height: 18px;

  position: absolute;
  top: -1px;
  left: 6px;

  border-radius: 2px;

  z-index: 1000;

  transform: rotate(-45deg);

  &::before {
    content: "";
    position: absolute;
    top: 2px;

    display: block;
    width: 2px;
    height: 6px;

    background-color: #ffffff;

    border: 1px solid #fff;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8px;

    display: block;
    width: 12px;
    height: 2px;

    background-color: #ffffff;

    border: 1px solid #fff;
  }
`;

export const OptionCheckBoxInput = styled.input`
  appearance: none;

  border: max(2px, 0.1em) solid gray;
  border-radius: 2px;
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

    width: 100%;
    height: 100%;

    background-color: #000000;

    animation: ${CheckBoxCheckedAnimation} 0.3s ease-in;
  }

  &:not(:checked)::after {
    transition-delay: 0.3s;

    content: "";
    display: block;
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: #ffffff;

    animation: ${CheckBoxUnCheckedAnimation} 0.3s ease-in;
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

export const OptionRadioButtonInput = styled.input`
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

export const QuestionFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const PreviousButton = styled.button`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #000000;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const NextButton = styled.button`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #000000;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const SubmitButton = styled.button`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #000000;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

export const FooterHeaderWrapper = styled.div``;

export const FooterTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const FooterBodyWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;
