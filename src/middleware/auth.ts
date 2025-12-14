import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { jwtVerify, importJWK } from 'jose';
import { Env } from '../env.d';
import { Context } from 'hono';
import { AppVariables } from '../app.d'; 

export type UserClaims = {
    id: string;
    email: string;
    role: string;
};

const authMiddleware = createMiddleware(async (c: Context<{ Bindings: Env, Variables: AppVariables }>, next) => {
    
    console.log('Auth middleware');
    const token = getCookie(c, 'auth_token');
    console.log(token);

    if (!token) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        const jwtSecretKey = await importJWK({ k: c.env.AUTH_SECRET, alg: 'HS256', kty: 'oct' });
        
        const { payload } = await jwtVerify(token, jwtSecretKey, {
            issuer: 'urn:hono-worker:issuer',
            audience: 'urn:hono-worker:audience',
        });
        
        c.set('user', payload as UserClaims); 
     
        await next();

    } catch (e) {
        console.error('JWT Verification Failed:', e);
        return c.json({ error: 'Unauthorized' }, 401);
    }
});

export default authMiddleware;