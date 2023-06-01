export interface RadioButtonQuestionFormProps {
  질문아이디리스트: string[];
  질문순서: number;
  질문제목: string;
  질문제목수정: (
    event: React.ChangeEvent<HTMLInputElement>,
    질문순서: number
  ) => void;
  선택지목록: string[];
  선택지추가: (질문Index: number) => void;
  선택지내용수정: (
    event: React.ChangeEvent<HTMLInputElement>,
    질문Index: number,
    옵션Index: number
  ) => void;
  다음질문: string[];
  다음질문으로이동: (
    event: React.ChangeEvent<HTMLSelectElement>,
    질문Index: number,
    옵션Index?: number | undefined
  ) => void;
}
