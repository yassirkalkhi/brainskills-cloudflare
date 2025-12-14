import { Hono } from 'hono';
import { SignJWT, jwtVerify, importJWK } from 'jose';
import { Env } from '../env.d';
import { DB } from '../db/db';
import { eq } from 'drizzle-orm';
import { getCookie, setCookie } from 'hono/cookie';
import * as argon2 from "argon2-browser";
import { AppVariables } from '../app.d';
import { schema } from '../db/schema';
import bcrypt from "bcryptjs";


const auth = new Hono<{ Bindings: Env, Variables: AppVariables }>();

async function getSigningKey(secret: string): Promise<CryptoKey> {
    const key = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
    return key as CryptoKey;
}

function verifyPassword(plainPassword: string, storedHash: string): boolean {
    
    return bcrypt.compareSync(plainPassword, storedHash); 
    
}
auth.post('/login', async (c) => {
    try {
        let email: string | undefined = undefined;
        let password: string | undefined = undefined;
        try{
            const body = await c.req.json();
            email = body.email;
            password = body.password;
            if(!email || !password){
                return c.json({ error: 'Missing email or password' }, 400);
            }
        }
        catch(e){
            return c.json({ error: 'Invalid request' }, 400);
        }
        
       
        const { user } = schema;
        const db = DB(c.env);

        const userResult = await db.select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        const foundUser = userResult[0];

        if (!foundUser || !verifyPassword(password, foundUser.password)) {
            return c.json({ error: 'Invalid credentials' }, 401);
        }

        const jwtPayload = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
        };

        const jwtSecretKey = await getSigningKey(c.env.AUTH_SECRET);
        const token = await new SignJWT(jwtPayload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('12h')
            .setIssuer('urn:hono-worker:issuer')
            .setAudience('urn:hono-worker:audience')
            .sign(jwtSecretKey);

        setCookie(c, 'auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 12 * 60 * 60,
            path: '/',
        });

        return c.json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

auth.post('/register', async (c) => {
    
    try {
        const { email, password, name , role} = await c.req.json();
        const { user } = schema;
        const db = DB(c.env);

        const userResult = await db.select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        const foundUser = userResult[0];

        if (foundUser) {
            return c.json({ error: 'User already exists' }, 400);
        }

        const salt = bcrypt.genSaltSync(10);
        const hashResult = bcrypt.hashSync(password, salt);

        await db.insert(user).values({
            id: crypto.randomUUID(),
            name,
            email,
            password: hashResult,
            createdAt: new Date(),
            role,
            instituteId: 1
        });

        return c.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

export default auth;