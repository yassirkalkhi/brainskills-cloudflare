import { sqliteTable, AnySQLiteColumn, foreignKey, integer, real, text, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const additional = sqliteTable("additional", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	amount: real(),
	description: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	instituteId: integer().references(() => institute.id),
});

export const bankOperation = sqliteTable("bankOperation", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	amount: real(),
	type: text(),
	description: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	instituteId: integer().references(() => institute.id),
});

export const cashierOperation = sqliteTable("cashierOperation", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	amount: real(),
	flux: text(),
	description: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	instituteId: integer().references(() => institute.id),
});

export const charge = sqliteTable("charge", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	amount: real(),
	description: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	instituteId: integer().references(() => institute.id),
});

export const enrollment = sqliteTable("enrollment", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	status: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	studentId: integer().references(() => student.id),
	subjectId: integer().references(() => subject.id),
	professorId: integer().references(() => professor.id),
	instituteId: integer().references(() => institute.id),
});

export const institute = sqliteTable("institute", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	nom: text().notNull(),
});

export const professor = sqliteTable("professor", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	fullName: text().notNull(),
	phone: text(),
	email: text(),
	status: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

export const professorPayment = sqliteTable("professorPayment", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	amount: real(),
	month: integer(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	professorId: integer().references(() => professor.id),
});

export const session = sqliteTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: integer().notNull(),
	token: text().notNull(),
	createdAt: integer().notNull(),
	updatedAt: integer().notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull().references(() => user.id),
},
(table) => [
	uniqueIndex("session_token_unique").on(table.token),
]);

export const student = sqliteTable("student", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	fullName: text().notNull(),
	groupCode: text(),
	phone: text(),
	status: text(),
	registration: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

export const studentPayment = sqliteTable("studentPayment", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	amount: real(),
	type: text(),
	month: integer(),
	date: text(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	enrollmentId: integer().references(() => enrollment.id),
});

export const subject = sqliteTable("subject", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	type: text(),
});

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	createdAt: integer().notNull(),
	role: text(),
	instituteId: integer().references(() => institute.id),
	password: text().notNull(),
},
(table) => [
	uniqueIndex("user_email_unique").on(table.email),
]);

