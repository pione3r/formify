import Image from "next/image";
import styled from "styled-components";

export const ViewFrame = styled.div`
  width: 100%;
  height: 50rem;

  border: 4px solid yellow;

  overflow: hidden;

  position: relative;
`;

export const Wrapper = styled.div`
  border: 4px solid blue;

  position: relative;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform-origin: 0 0;
`;

export const QuestionNodeWrapper = styled.div<{ style: any }>`
  width: 300px;
  height: 200px;

  border-radius: 16px;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;

  z-index: 1000;

  user-select: none;

  padding: 20px;

  transition: box-shadow, transform 0.2s ease-in-out;

  &:hover {
    box-shadow: rgb(0 0 0 / 12%) 6px 8px 16px;
    cursor: pointer;
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const QuestionIndex = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: rgb(152 152 152);

  &::after {
    content: "";

    display: block;
    width: 100%;
    height: 2px;

    margin-top: 4px;

    border: 1px solid rgb(245, 245, 247);
  }
`;

export const QuestionTitleInput = styled.input`
  border: none;
  outline: none;

  font-size: 1.6rem;
`;

export const QuestionDeleteButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;

  padding: 6px;

  border-radius: 50%;

  background-color: rgb(191 191 191);

  border: none;

  &:hover {
    background-color: rgb(207 203 203);

    cursor: pointer;
  }
`;

export const DeleteButtonIcon = styled(Image)`
  object-fit: contain;
`;

export const OptionAddButton = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;

  background-color: #000000;

  outline: none;
  border: none;

  border-radius: 16px;

  padding: 10px 20px;

  &:hover {
    cursor: pointer;
  }
`;

export const ConnectStartHandle = styled.div`
  width: 20px;
  height: 20px;

  background-color: #000000;

  border-radius: 4px;

  position: absolute;
  top: 90px;
  right: -10px;

  &:hover {
    cursor: pointer;
  }
`;

export const OptionsWrapper = styled.div`
  position: absolute;
  top: 220px;
  left: 0px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

export const OptionWrapper = styled.div`
  background-color: #ffffff;

  border-radius: 20px;

  display: flex;
  align-items: center;

  padding: 12px 16px;

  position: relative;
`;

export const OptionTitleInput = styled.input`
  width: 100%;

  outline: none;
  border: none;

  font-size: 1.6rem;
`;

export const OptionConnectStartHandle = styled.div`
  width: 20px;
  height: 20px;

  background-color: #000000;

  border-radius: 4px;

  position: absolute;
  top: 12px;
  right: -8px;

  &:hover {
    cursor: pointer;
  }
`;

export const DrawEdgesWrapper = styled.div``;

export const PreviewWrapper = styled.div`
  min-height: 50rem;
  background-color: green;

  font-size: 3rem;
`;

export const CurrentQuestionWrapper = styled.div``;

export const CurrentQuestionTitle = styled.div``;

export const CurrentQuestionAnswerInput = styled.input``;

export const PreviousQuestionButton = styled.button``;
