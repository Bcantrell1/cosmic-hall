import { config } from 'dotenv';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
    out: './migrations',
    schema: './db/schema.ts',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL ?? '',
        authToken: process.env.TURSO_AUTH_TOKEN ?? '',
    },
});
