import styled from "styled-components";

import Link from "next/link";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  margin: 100px auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

export const NoSurveys = styled.div`
  font-size: 2.5rem;
`;

export const SurveysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SurveyLink = styled(Link)`
  color: #000000;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const SurveyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  background-color: #ffffff;

  padding: 20px;

  border-radius: 12px;

  cursor: pointer;

  transition: all 0.2s ease-in-out 0s;

  user-select: none;

  &:hover {
    box-shadow: rgb(0 0 0 / 12%) 6px 8px 16px;
    transform: translateY(-2px);
  }
`;

export const Created = styled.div`
  font-size: 1.4rem;
  color: #555555;
`;

export const SurveyTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 700;

  width: 30rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ClipBoardCopyButton = styled.button`
  margin-left: auto;

  font-size: 1.6rem;
  color: #ffffff;

  background-color: #000000;

  padding: 12px 12px;

  outline: none;
  border: none;

  border-radius: 24px;

  cursor: pointer;

  &:hover {
    background-color: #4e4e4e;
  }
`;
