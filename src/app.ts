
import { Hono } from "hono";
import type { Env } from './env.d.ts'; 
import type { AppVariables } from './app.d';
import authMiddleware from './middleware/auth';
import auth from './routes/auth';
import dbMiddleware from './middleware/db';
import { schema } from "./db/schema.js";
import { DB } from "./db/db";






const app = new Hono<{ Bindings: Env, Variables: AppVariables }>();

 app.route('/auth', auth);

 app.use('/auth/*', dbMiddleware);

app.use(
    '/api/*', 
    dbMiddleware, 
    authMiddleware 
);
app.use('/api/protected', async (c) => { 
    const user = c.get('user');
    return c.json({ user });
});
 


export default app;