import { z } from 'zod';

// Base schemas for common patterns
const idSchema = z.number().int().positive();
const userIdSchema = z.string().min(1, 'User ID is required');
const titleSchema = z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters');
const descriptionSchema = z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters');
const timestampSchema = z.string().datetime().optional();

// Course schemas
export const courseSchema = z.object({
  id: idSchema.optional(),
  title: titleSchema,
  description: descriptionSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const createCourseSchema = courseSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateCourseSchema = courseSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

// Unit schemas
export const unitSchema = z.object({
  id: idSchema.optional(),
  title: titleSchema,
  description: descriptionSchema,
  course_id: idSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const createUnitSchema = unitSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateUnitSchema = unitSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

// Session schemas
export const sessionSchema = z.object({
  id: idSchema.optional(),
  title: titleSchema,
  description: descriptionSchema,
  duration: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Duration must be in HH:MM:SS format'),
  unit_id: idSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const createSessionSchema = sessionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateSessionSchema = sessionSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

// Activity schemas
export const activitySchema = z.object({
  id: idSchema.optional(),
  title: titleSchema,
  description: descriptionSchema,
  duration: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Duration must be in HH:MM:SS format'),
  session_id: idSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const createActivitySchema = activitySchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateActivitySchema = activitySchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

// Question schemas
export const questionSchema = z.object({
  id: idSchema.optional(),
  question: z.string().min(1, 'Question is required').max(1000, 'Question must be less than 1000 characters'),
  activity_id: idSchema,
  unit_id: idSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const createQuestionSchema = questionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateQuestionSchema = questionSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

// Option schemas
export const optionSchema = z.object({
  id: idSchema.optional(),
  option: z.string().min(1, 'Option text is required').max(200, 'Option must be less than 200 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  correct: z.number().int().min(0).max(1, 'Correct must be 0 or 1'),
  question_id: idSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const createOptionSchema = optionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateOptionSchema = optionSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

// User Progress schemas
export const userCourseProgressSchema = z.object({
  id: idSchema.optional(),
  userId: userIdSchema,
  courseId: idSchema,
  progress: z.number().int().min(0).max(100, 'Progress must be between 0 and 100'),
  status: z.enum(['not-started', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Status must be not-started, in-progress, or completed' }),
  }),
  startedAt: timestampSchema,
  completedAt: timestampSchema,
  lastAccessedAt: timestampSchema,
});

export const userUnitProgressSchema = z.object({
  id: idSchema.optional(),
  userId: userIdSchema,
  unitId: idSchema,
  progress: z.number().int().min(0).max(100, 'Progress must be between 0 and 100'),
  status: z.enum(['not-started', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Status must be not-started, in-progress, or completed' }),
  }),
  startedAt: timestampSchema,
  completedAt: timestampSchema,
  lastAccessedAt: timestampSchema,
});

export const userSessionProgressSchema = z.object({
  id: idSchema.optional(),
  userId: userIdSchema,
  sessionId: idSchema,
  progress: z.number().int().min(0).max(100, 'Progress must be between 0 and 100'),
  status: z.enum(['not-started', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Status must be not-started, in-progress, or completed' }),
  }),
  startedAt: timestampSchema,
  completedAt: timestampSchema,
  lastAccessedAt: timestampSchema,
});

export const userActivityProgressSchema = z.object({
  id: idSchema.optional(),
  userId: userIdSchema,
  activityId: idSchema,
  status: z.enum(['not-started', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Status must be not-started, in-progress, or completed' }),
  }),
  timeSpent: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Time spent must be in HH:MM:SS format'),
  startedAt: timestampSchema,
  completedAt: timestampSchema,
  lastAccessedAt: timestampSchema,
});

export const userAnswerSchema = z.object({
  id: idSchema.optional(),
  userId: userIdSchema,
  questionId: idSchema,
  selectedOptionId: idSchema,
  isCorrect: z.number().int().min(0).max(1, 'isCorrect must be 0 or 1'),
  attemptNumber: z.number().int().min(1, 'Attempt number must be at least 1'),
  answeredAt: timestampSchema,
  unitId: idSchema,
});

// Action input schemas
export const getQuestionsSchema = z.object({
  activityId: idSchema,
});

export const getOptionsSchema = z.object({
  questionId: idSchema,
});

export const addUserAnswerProgressSchema = z.object({
  userId: userIdSchema,
  questionId: idSchema,
  unitId: idSchema,
  attemptNumber: z.number().int().min(1, 'Attempt number must be at least 1'),
  optionId: idSchema,
  isCorrect: z.number().int().min(0).max(1, 'isCorrect must be 0 or 1'),
});

export const updateUserAnswerProgressSchema = z.object({
  userId: userIdSchema,
  questionId: idSchema,
  attemptNumber: z.number().int().min(1, 'Attempt number must be at least 1'),
  selectedOptionId: idSchema,
  isCorrect: z.number().int().min(0).max(1, 'isCorrect must be 0 or 1'),
});

export const addUserCourseProgressSchema = z.object({
  userId: userIdSchema,
  courseId: idSchema,
  progress: z.number().int().min(0).max(100, 'Progress must be between 0 and 100'),
});

export const addUserSessionProgressSchema = z.object({
  userId: userIdSchema,
  sessionId: idSchema,
  progress: z.number().int().min(0).max(100, 'Progress must be between 0 and 100'),
});

export const addUserActivityProgressSchema = z.object({
  userId: userIdSchema,
  activityId: idSchema,
});

export const updateUserActivityProgressSchema = z.object({
  userId: userIdSchema,
  activityId: idSchema,
  status: z.enum(['not-started', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Status must be not-started, in-progress, or completed' }),
  }),
  timeSpent: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Time spent must be in HH:MM:SS format'),
});

// URL parameter schemas
export const courseIdParamSchema = z.object({
  courseId: z.string().regex(/^\d+$/, 'Course ID must be a number').transform(Number),
});

export const sessionIdParamSchema = z.object({
  sessionId: z.string().regex(/^\d+$/, 'Session ID must be a number').transform(Number),
});

export const activityIdParamSchema = z.object({
  activityId: z.string().regex(/^\d+$/, 'Activity ID must be a number').transform(Number),
});

// Export types
export type Course = z.infer<typeof courseSchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;
export type UpdateCourse = z.infer<typeof updateCourseSchema>;

export type Unit = z.infer<typeof unitSchema>;
export type CreateUnit = z.infer<typeof createUnitSchema>;
export type UpdateUnit = z.infer<typeof updateUnitSchema>;

export type Session = z.infer<typeof sessionSchema>;
export type CreateSession = z.infer<typeof createSessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;

export type Activity = z.infer<typeof activitySchema>;
export type CreateActivity = z.infer<typeof createActivitySchema>;
export type UpdateActivity = z.infer<typeof updateActivitySchema>;

export type Question = z.infer<typeof questionSchema>;
export type CreateQuestion = z.infer<typeof createQuestionSchema>;
export type UpdateQuestion = z.infer<typeof updateQuestionSchema>;

export type Option = z.infer<typeof optionSchema>;
export type CreateOption = z.infer<typeof createOptionSchema>;
export type UpdateOption = z.infer<typeof updateOptionSchema>;

export type UserCourseProgress = z.infer<typeof userCourseProgressSchema>;
export type UserUnitProgress = z.infer<typeof userUnitProgressSchema>;
export type UserSessionProgress = z.infer<typeof userSessionProgressSchema>;
export type UserActivityProgress = z.infer<typeof userActivityProgressSchema>;
export type UserAnswer = z.infer<typeof userAnswerSchema>; 