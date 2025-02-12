import { AnswerOption, Questions, UserAnswer } from "@/app/lib/data";
import MultipleChoiceQuestion from "./MultipleChoice";

type QuestionViewerProps = {
  userId: string;
  currentQuestion: Questions;
  options: AnswerOption[];
  userProgress: UserAnswer[];
  activityId: string;
  unitId: string;
};


export const QuestionViewer = ({
  userId,
  currentQuestion,
  options,
  userProgress,
  activityId,
  unitId
}: QuestionViewerProps) => (
  <MultipleChoiceQuestion
    userId={userId}
    questionId={currentQuestion.id}
    key={currentQuestion.id}
    questionText={currentQuestion.question}
    options={options}
    userProgress={userProgress}
    activityId={Number(activityId)}
    unitId={Number(unitId)}
  />
); 