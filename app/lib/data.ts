import { mockCourses } from "./dummy";

export type Course = {
  id: string;
  name: string;
	description: string;
  courseProgress: {
    currentUnit: number;
    totalUnits: number;
  };
  units: Unit[];
};

export type Unit = {
  id: string;
	unitId: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'complete';
  progress: number;
  sessions: Session[];
};

export type Session = {
  id: string;
	sessionId: string;
  title: string;
  duration: string;
  status: 'not-started' | 'in-progress' | 'complete';
  activities: Activity[];
};

export type Activity = {
	id: string;
	activityId: string;
	title: string;
	duration: string;
	status: 'not-started' | 'in-progress' | 'complete';
	imgUrl?: string;
	description?: string;
	questions?: Questions[];
}

export type Questions = {
	id: string;
	questionId: string;
	question: string;
	correct: string;
	options: AnswerOption[]
}

export type AnswerOption = {
	id: string;
	text: string;
}

export async function getCourse(courseId: string): Promise<Course | undefined> {
  return mockCourses.find(course => course.id === courseId);
}

export async function getSession(courseId: string, sessionId: string): Promise<Session | undefined> {
  const course = await getCourse(courseId);
  return course?.units
    .flatMap(unit => unit.sessions)
    .find(session => session.id === sessionId);
}

export async function getActivities(
  courseId: string,
  sessionId: string
): Promise<Activity[] | undefined> {
  const session = await getSession(courseId, sessionId);
  return session?.activities;
}
