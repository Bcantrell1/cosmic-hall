import { Activity, Questions, UserAnswer, AnswerOption } from '@/app/lib/data';
import { ActivityHeader } from './components/ActivityHeader';
import { QuestionViewer } from './components/QuestionViewer';

type ActivityViewerProps = {
    activity: Activity;
    currentQuestion: Questions | null;
    options: AnswerOption[];
    userProgress: UserAnswer[];
    userId: string;
    unitId: string;
    isLoadingOptions: boolean;
};

export const ActivityViewer = ({
    activity,
    currentQuestion,
    options,
    userProgress,
    userId,
    unitId,
    isLoadingOptions,
}: ActivityViewerProps) => (
    <>
        <ActivityHeader
            title={activity.title}
            duration={Number(activity.duration)}
            userProgress={userProgress}
        />
        <div className="text-md mt-2">{activity.description}</div>

        {currentQuestion && userId && !isLoadingOptions && (
            <QuestionViewer
                userId={userId}
                currentQuestion={currentQuestion}
                options={options}
                userProgress={userProgress}
                activityId={activity.id.toString()}
                unitId={unitId}
            />
        )}
    </>
);
