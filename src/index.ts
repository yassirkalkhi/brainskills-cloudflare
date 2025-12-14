import app from './app';  
import type{ Env } from './env.d.ts';

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        return app.fetch(request, env, ctx); 
    },
};