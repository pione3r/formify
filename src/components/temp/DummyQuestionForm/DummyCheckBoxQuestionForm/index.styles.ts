import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: #ffffff;

  padding: 20px;

  border-radius: 20px;

  user-select: none;
`;

export const Index = styled.div`
  font-size: 1.3rem;
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

export const Title = styled.div`
  display: block;

  font-size: 1.8rem;
  font-weight: 500;
  color: #212529;

  resize: none;
  outline: none;
  border: none;
`;

export const AnswerGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: #ececec;

  padding: 20px;
  margin-top: 10px;

  border-radius: 12px;
`;

export const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  background-color: #ffffff;

  padding: 10px;

  border-radius: 16px;
`;

export const RadioButtonInput = styled.input``;

export const RadioLabelInput = styled.div`
  border: none;
  outline: none;

  font-size: 1.4rem;
  font-weight: 400;
`;

export const AddAnswerButton = styled.button``;
