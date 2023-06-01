import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 50px;

  width: 80rem;

  margin: 100px auto;
`;

export const PaginationBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 100px;

  min-width: 5rem;
`;

export const DotWrapper = styled.div`
  display: flex;
  gap: 20px;

  min-width: fit-content;
`;

export const Dot = styled.div<{ isCurrent: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.isCurrent ? "#000000" : "#a8a8a8")};

  border-radius: 50%;

  transition: all 0.3s;
`;

export const SubDotsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SubDot = styled.div`
  width: 16px;
  height: 16px;
  background-color: #a8a8a8;

  border-radius: 50%;

  transition: all 0.3s;
`;

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  flex-direction: column;
  gap: 20px;

  min-width: 50rem;
  height: 50rem;

  padding: 20px;

  overflow: scroll;

  border: 1px dashed black;
  border-radius: 16px;
`;

export const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  margin-top: 100px;
`;

export const QuestionTypeButtonBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 20px 20px;

  background-color: #ffffff;

  box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  position: relative;

  &:before {
    content: "클릭 or 드래그 앤 드롭";

    display: block;
    position: absolute;
    top: -40px;
    left: 0px;

    font-size: 2rem;
    font-weight: 700;

    padding-left: 9px;

    width: 100%;

    opacity: 0;

    transition: all 0.5s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
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

  background-color: #2b44ff;

  padding: 10px 16px;

  border-radius: 16px;

  cursor: pointer;

  width: 100%;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;
