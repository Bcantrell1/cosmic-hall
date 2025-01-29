export type Course = {
  id: number;
  title: string;
	description: string;
  courseProgress: number;
};


export type Unit = {
  id: number;
  title: string;
  status: string;
  unitProgress: number;
};


export type Session = {
  id: number;
  title: string;
  description: string;
  duration: string;
  sessionProgress: number;
};


export type Activity = {
	id: number;
	title: string;
	description: string;
	duration: string;
	status: string;
}

export type Questions = {
	id: number;
	question: string;
  activity_id: number | null;
}

export type AnswerOption = {
	id: number;
  question_id: number | null;
  correct: number;
  option: string;
  description: string;
}

export type UserProgress = {
  userId: string;
  courses: UserCourseProgress[];
}

export type UserCourseProgress = {
  courseId: string;
  units: UserUnitProgress[];
}

export type UserUnitProgress = {
  unitId: string;
  status: 'not-started' | 'in-progress' | 'complete';
  sessions: UserSessionProgress[];
}

export type UserSessionProgress = {
  sessionId: string;
  status: 'not-started' | 'in-progress' | 'complete';
  activities: UserActivityProgress[];
}

export type UserActivityProgress = {
  activityId: string;
  status: 'not-started' | 'in-progress' | 'complete';
  completedQuestions: string[];
}