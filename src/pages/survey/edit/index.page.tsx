import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { useState } from "react";
import * as S from "./index.styles";

import type { QuestionEdge, QuestionNode } from "@/types/general";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

import { SurveyFlow } from "@/components/SurveyFlow";
import { SurveyPreview } from "@/components/SurveyPreview";
import { Backend_API_URL } from "@/common/url";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const initialQuestionNodes = [
  {
    questionId: "start",
    data: { questionTitle: "" },
    position: { x: 100, y: 100 },
  },
  {
    questionId: "end",
    data: { questionTitle: "" },
    position: { x: 1200, y: 700 },
  },
];

export default function SurveyEditPage() {
  const { data } = useSession();
  const userEmail = data?.user?.email;

  const router = useRouter();

  const [surveyTitle, setSurveyTitle] = useState("");

  const [questionNodes, setQuestionNodes] =
    useState<QuestionNode[]>(initialQuestionNodes);

  const [questionEdges, setQuestionEdges] = useState<QuestionEdge[]>([]);

  const onSurveySubmit = async () => {
    if (surveyTitle === "") {
      alert("설문 제목을 입력하세요");
      return;
    }

    const response = await fetch(`${Backend_API_URL}/survey`, {
      method: "POST",
      body: JSON.stringify({
        surveyTitle: surveyTitle,
        survey: {
          questionNodes,
          questionEdges,
        },
      }),
    });

    if (response.status === 201) {
      alert("질문폼 생성 성공");
      router.replace(`/surveys/${userEmail}`);
    }
    if (response.status === 401) {
      alert("질문폼 생성 실패");
    }
  };

  return (
    <>
      <Head>
        <title>{`작성중 ${
          surveyTitle === "" ? "" : `| ${surveyTitle}`
        }`}</title>
      </Head>
      <S.Header>
        <S.HeaderLogo href="/">F*</S.HeaderLogo>
        <S.SurveyTitleInputWrapper>
          <S.SurveyTitleInput
            placeholder="설문 제목을 입력하세요."
            value={surveyTitle}
            onChange={(event) => setSurveyTitle(event.target.value)}
            spellCheck={false}
          />
        </S.SurveyTitleInputWrapper>
        <S.SubmitButton onClick={onSurveySubmit}>폼 생성하기</S.SubmitButton>
      </S.Header>
      <S.Body>
        <SurveyFlow
          questionNodes={questionNodes}
          questionEdges={questionEdges}
          setQuestionNodes={setQuestionNodes}
          setQuestionEdges={setQuestionEdges}
        />
        <SurveyPreview
          surveyTitle={surveyTitle}
          questionNodes={questionNodes}
          questionEdges={questionEdges}
        />
      </S.Body>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: { userEmail: session?.user?.email } };
}
