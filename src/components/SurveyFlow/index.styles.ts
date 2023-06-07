import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;

  position: relative;

  border: 0.5px solid #9b9b9b;

  overflow: auto;
  overscroll-behavior: contain;
`;

export const FlowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform-origin: 0 0;
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

  font-size: 1.6rem;

  outline: none;
  background: none;
  border: none;
`;
