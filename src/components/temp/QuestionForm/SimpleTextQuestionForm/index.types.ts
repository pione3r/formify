export interface SimpleTextQuestionFormProps {
  질문아이디리스트: string[];
  질문순서: number;
  질문제목: string;
  질문제목수정: (
    event: React.ChangeEvent<HTMLInputElement>,
    질문순서: number
  ) => void;
  다음질문: string;
  다음질문으로이동: (
    event: React.ChangeEvent<HTMLSelectElement>,
    질문Index: number,
    옵션Index?: number | undefined
  ) => void;
}
