import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { item } from './schema/item';
import { NextFunction } from 'express';

export const db = drizzle(process.env.DATABASE_URL!);
export const schema = {
    item
}