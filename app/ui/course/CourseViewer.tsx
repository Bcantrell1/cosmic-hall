'use client';
import { addUserSessionProgress, addUserUnitProgress } from '@/app/actions/addProgressAction';
import { getSessionProgress, getUnitProgress } from '@/app/actions/getProgressAction';
import { Course, Session, Unit, UserSession, UserUnit } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { UnitCard } from './components/UnitCard';

type CourseViewerProps = {
    course: Course;
    units: Unit[];
    sessions: Session[];
    unitProgress?: UserUnit[];
    sessionProgress?: UserSession[];
    userId: string;
};

export const CourseViewer: React.FC<CourseViewerProps> = ({
    units,
    course,
    sessions,
    unitProgress,
    sessionProgress,
    userId,
}) => {
    const router = useRouter();

    const handleSessionStart = async (sessionId: number, unitId: number) => {
        try {
            const unitProgress = await getUnitProgress({ userId, unitId });
            if (unitProgress?.progress == 0 || unitProgress?.progress == null) {
                await addUserUnitProgress(userId, unitId, 1);
                await addUserSessionProgress(userId, sessionId, 1);
            } else {
                const sessionProgress = await getSessionProgress({ userId, sessionId });
                if (sessionProgress?.progress == 0 || sessionProgress?.progress == null) {
                    await addUserSessionProgress(userId, sessionId, 1);
                }
            }
            router.push(`/course/${course.id}/session/${sessionId}`);
        } catch (error) {
            console.error('Error starting session', error);
        }
    };

    return (
        <div className="pt-3">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">{course.title}</h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
            </div>
            <div className="space-y-4">
                {units.map((unit, index) => (
                    <UnitCard
                        key={unit.id}
                        unit={unit}
                        index={index}
                        sessions={sessions}
                        unitProgress={unitProgress}
                        sessionProgress={sessionProgress}
                        onSessionStart={handleSessionStart}
                    />
                ))}
            </div>
        </div>
    );
};
