'use client';
import { getOptions } from '@/app/actions/getOptionsAction';
import { getUserAnswerProgressByActivityId } from '@/app/actions/getProgressAction';
import { getQuestions } from '@/app/actions/getQuestionsAction';
import { Activity, AnswerOption, Questions, Session, UserAnswer } from '@/app/lib/data';
import { useEffect, useState } from 'react';
import Sidebar from './components/SessionSidebar';
import { NavigationControls } from '../common/NavigationControls';
import { SessionHeader } from './components/SessionHeader';
import { ActivityViewer } from '../activity/ActivityViewer';
import { ActivitySkeleton } from '../activity/components/ActivitySkeleton';

type SessionViewerProps = {
    session: Session;
    activities: Activity[];
    userId: string;
};

export const SessionViewer: React.FC<SessionViewerProps> = ({ session, activities, userId }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [options, setOptions] = useState<AnswerOption[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Questions | null>(null);
    const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
    const [isLoadingActivity, setIsLoadingActivity] = useState<boolean>(false);
    const [userProgress, setUserProgress] = useState<UserAnswer[]>([]);

    useEffect(() => {
        const fetchActivityData = async () => {
            setIsLoadingActivity(true);
            if (activities.length > 0) {
                try {
                    const [questionsResponse, userProgress] = await Promise.all([
                        getQuestions(activities[selectedIndex].id),
                        getUserAnswerProgressByActivityId({
                            userId,
                            activityId: activities[selectedIndex].id,
                        }),
                    ]);

                    if ('success' in questionsResponse && questionsResponse.success) {
                        setQuestions(questionsResponse.questions || []);
                        setCurrentQuestion(questionsResponse.questions?.[0] || null);
                    } else if ('error' in questionsResponse) {
                        console.error('Failed to fetch questions:', questionsResponse.error);
                        setQuestions([]);
                        setCurrentQuestion(null);
                    }

                    if (userProgress) {
                        setUserProgress(userProgress);
                    }
                } catch (error) {
                    console.error('Error fetching activity data:', error);
                } finally {
                    setIsLoadingActivity(false);
                }
            }
        };

        fetchActivityData();
    }, [selectedIndex, activities, userId]);

    useEffect(() => {
        if (currentQuestion) {
            setIsLoadingOptions(true);
            const fetchOptions = async () => {
                const optionsResponse = await getOptions(currentQuestion.id);
                if ('success' in optionsResponse && optionsResponse.success) {
                    setOptions(optionsResponse.options || []);
                    setIsLoadingOptions(false);
                } else if ('error' in optionsResponse) {
                    console.error('Failed to fetch options:', optionsResponse.error);
                    setOptions([]);
                    setIsLoadingOptions(false);
                }
            };
            fetchOptions();
        }
    }, [currentQuestion]);

    const handleNext = () => setSelectedIndex(selectedIndex + 1);
    const handlePrevious = () => setSelectedIndex(selectedIndex - 1);

    return (
        <div className="flex">
            <Sidebar
                activities={activities}
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
            />
            <section className="flex flex-col w-full">
                <SessionHeader
                    title={session.title}
                    currentIndex={selectedIndex}
                    totalActivities={activities.length}
                />

                <div className="bg-white p-4">
                    {isLoadingActivity ? (
                        <ActivitySkeleton />
                    ) : (
                        <ActivityViewer
                            activity={activities[selectedIndex]}
                            currentQuestion={currentQuestion}
                            options={options}
                            userProgress={userProgress}
                            userId={userId}
                            unitId={questions[0]?.unit_id?.toString() || ''}
                            isLoadingOptions={isLoadingOptions}
                        />
                    )}
                    <div className="h-4"></div>
                    <NavigationControls
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        showNext={selectedIndex < activities.length - 1}
                        showPrevious={selectedIndex > 0}
                    />
                </div>
            </section>
        </div>
    );
};
