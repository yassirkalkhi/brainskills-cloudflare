import { createMiddleware } from 'hono/factory';
import { Env } from '../env.d';
import { Context } from 'hono';
import { AppVariables } from '../app.d';
import { DB } from '../db/db';
import { schema } from '../db/schema';

const dbMiddleware = createMiddleware(async (c: Context<{ Bindings: Env, Variables: AppVariables }>, next) => {
     console.log('db middleware');
    c.set('db', await DB(c.env));
    c.set('schema', schema);
    await next();
}); 

export default dbMiddleware;