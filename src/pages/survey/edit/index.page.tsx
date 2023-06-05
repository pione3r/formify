import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { useState } from "react";

import type { QuestionEdge, QuestionNode } from "@/types/general";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

import { SurveyFlow } from "@/components/SurveyFlow";
import { SurveyPreview } from "@/components/SurveyPreview";

const initialQuestionNodes = [
  {
    questionId: "start",
    data: { questionTitle: "" },
    position: { x: 200, y: 100 },
  },
  {
    questionId: "end",
    data: { questionTitle: "" },
    position: { x: 1200, y: 150 },
  },
];

export default function SurveyEditPage() {
  const [surveyTitle, setSurveyTitle] = useState("");

  const [questionNodes, setQuestionNodes] =
    useState<QuestionNode[]>(initialQuestionNodes);

  const [questionEdges, setQuestionEdges] = useState<QuestionEdge[]>([]);

  return (
    <>
      <Head>
        <title>{`작성중 ${
          surveyTitle === "" ? "" : `| ${surveyTitle}`
        }`}</title>
      </Head>
      <SurveyFlow
        surveyTitle={surveyTitle}
        questionNodes={questionNodes}
        questionEdges={questionEdges}
        setSurveyTitle={setSurveyTitle}
        setQuestionNodes={setQuestionNodes}
        setQuestionEdges={setQuestionEdges}
      />
      <SurveyPreview
        surveyTitle={surveyTitle}
        questionNodes={questionNodes}
        questionEdges={questionEdges}
      />
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
