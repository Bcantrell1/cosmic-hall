export type Course = {
  id: number;
  title: string;
	description: string;
};

export type Unit = {
  id: number;
  title: string;
};

export type Session = {
  id: number;
  title: string;
  description: string;
  duration: string;
};

export type Activity = {
	id: number;
	title: string;
	description: string;
	duration: string;
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

export type UserCourse = {
	id: number;
	userId: string;
	courseId: number | null;
	progress: number;
}

export type UserUnit = {
	id: number;
	userId: string;
	unitId: number | null;
	progress: number;
}

export type UserSession = {
	id: number;
	userId: string;
	sessionId: number | null;
	progress: number;
}

export type UserAnswer = {
	id: number;
	userId: string;
	questionId: number | null;
	selectedOptionId: number | null;
	isCorrect: number;
}
