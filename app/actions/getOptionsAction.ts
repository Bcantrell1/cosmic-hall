'use server';

import { DatabaseError, NotFoundError, ValidationError } from '@/app/lib/errors';
import { validateInput } from '@/app/lib/validation-utils';
import { getOptionsSchema } from '@/app/lib/validations';
import { db } from '@/db';
import { optionsTable } from '@/db/schema/courses';
import { eq } from 'drizzle-orm';

export async function getOptions(questionId: number) {
    try {
        // Validate input
        const validatedData: any = validateInput(getOptionsSchema, { questionId });
        
        const options = await db
            .select()
            .from(optionsTable)
            .where(eq(optionsTable.question_id, validatedData.questionId));
        
        if (!options.length) {
            throw new NotFoundError('Options for this question');
        }
        
        return {
            success: true,
            options,
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
        
        console.error('Error getting options:', error);
        return {
            success: false,
            error: 'Failed to fetch options',
            code: 'DATABASE_ERROR',
        };
    }
}
