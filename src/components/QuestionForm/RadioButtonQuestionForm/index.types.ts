export interface RadioButtonQuestionFormProps {
  섹션Id: string;
  질문순서: number;
  질문제목: string;
  질문제목수정: (event: React.ChangeEvent<HTMLInputElement>) => void;
  선택지목록: string[];
  선택지추가: () => void;
  선택지내용수정: (
    sectionId: string,
    event: React.ChangeEvent<HTMLInputElement>,
    질문Index: number,
    옵션Index: number
  ) => void;
}
