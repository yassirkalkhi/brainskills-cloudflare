import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import type { Env } from '../env';
import { schema } from './schema';




export const DB = (c: Env): DrizzleD1Database<typeof schema> => { 
   const db = drizzle(c.D1_DRIZZLE,
      {
         schema,
      }
   )
   
   return db;
}  
 