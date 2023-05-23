import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 30px;

  max-width: 100rem;

  padding-top: 100px;

  margin: 0 auto;
`;

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SurveyTitleInputWrapper = styled.div`
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #777777;
  }
`;

export const SurveyTitleInput = styled.input`
  width: 100%;

  font-size: 3rem;

  outline: none;
  background: none;
  border: none;
`;

export const DropZone = styled.div`
  display: flex;
  gap: 20px;

  width: 80rem;
  height: 50rem;

  padding: 20px;

  overflow: scroll;

  border: 1px dashed black;
  border-radius: 16px;
`;

export const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

export const QuestionPickBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 20px 40px;

  background-color: #ffffff;

  box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

export const QuestionTypeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;

  background-color: #000000;

  width: 160px;
  padding: 10px 16px;

  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  user-select: none;

  cursor: pointer;
`;

export const SubmitButton = styled.button`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;

  background-color: #000000;

  padding: 10px 16px;

  border-radius: 16px;

  cursor: pointer;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;
