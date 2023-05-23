import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  position: relative;

  min-width: 80rem;

  padding-top: 300px;
  padding-left: 200px;
  padding-right: 200px;

  &::after {
    content: "";

    display: block;
    position: absolute;
    top: 0px;
    right: 0px;

    height: 100%;
    margin-top: 60px;

    border: 1px dashed black;
  }
`;

export const ColumnLeftHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  font-size: 3rem;

  outline: none;
  background: none;
  border: none;
`;

export const ColumnLeftDescription = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const ColumnLeftBody = styled.div`
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

export const ColummRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  margin-top: 200px;

  width: 100%;
`;

export const ColumnRightHeader = styled.div``;

export const ColumnRightDescription = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const ColumnRightBody = styled.div`
  display: flex;
  gap: 20px;

  width: 100rem;
  height: 50rem;

  padding: 20px;

  overflow: scroll;

  border: 1px dashed black;
  border-radius: 16px;
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
