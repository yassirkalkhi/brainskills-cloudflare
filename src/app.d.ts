
import { DrizzleD1Database } from "drizzle-orm/d1";
import { schema } from "./db/schema";
import { UserClaims } from "./middleware/auth";



export type DB = DrizzleD1Database<typeof schema>;

export type AppVariables = {
    user: UserClaims;
    db: DB;
    schema: typeof schema;
}