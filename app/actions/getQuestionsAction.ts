'use server';

import { DatabaseError, NotFoundError, ValidationError } from '@/app/lib/errors';
import { validateInput } from '@/app/lib/validation-utils';
import { getQuestionsSchema } from '@/app/lib/validations';
import { db } from '@/db';
import { questionsTable } from '@/db/schema/courses';
import { eq } from 'drizzle-orm';

export async function getQuestions(activityId: number) {
    try {
        // Validate input
        const validatedData: any = validateInput(getQuestionsSchema, { activityId });
        
        const questions = await db
            .select()
            .from(questionsTable)
            .where(eq(questionsTable.activity_id, validatedData.activityId));
        
        if (!questions.length) {
            throw new NotFoundError('Questions for this activity');
        }
        
        return {
            success: true,
            questions,
        };
    } catch (error) {
        if (error instanceof ValidationError) {
            return {
                success: false,
                error: error.message,
                code: error.code,
            };
        }
        
        if (error instanceof NotFoundError) {
            return {
                success: false,
                error: error.message,
                code: error.code,
            };
        }
        
        console.error('Error getting questions:', error);
        return {
            success: false,
            error: 'Failed to fetch questions',
            code: 'DATABASE_ERROR',
        };
    }
}
