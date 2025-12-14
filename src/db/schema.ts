import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

 
export const institute = sqliteTable("institute", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nom: text("nom").notNull(),
});

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),  
    password: text("password").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(), 
    role: text("role"), // 'admin' | 'manager'
    instituteId: integer("instituteId").references(() => institute.id), // Link to institute for multi-tenancy
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => user.id),
});

 
 

export const student = sqliteTable("student", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("fullName").notNull(),
    groupCode: text("groupCode"),
    phone: text("phone"),
    status: text("status"), // REFERENCES studentStatus
    registration: text("registration"), // DATE -> text in sqlite
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const professor = sqliteTable("professor", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("fullName").notNull(),
    phone: text("phone"),
    email: text("email"),
    status: text("status"),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const subject = sqliteTable("subject", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    type: text("type"),
});

export const enrollment = sqliteTable("enrollment", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    status: text("status"), // REFERENCES enrollmentStatus
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    studentId: integer("studentId").references(() => student.id),
    subjectId: integer("subjectId").references(() => subject.id),
    professorId: integer("professorId").references(() => professor.id),
    instituteId: integer("instituteId").references(() => institute.id),
});

export const professorPayment = sqliteTable("professorPayment", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: real("amount"), // DECIMAL(10,2) -> real in sqlite
    month: integer("month"),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    professorId: integer("professorId").references(() => professor.id),
    // UNIQUE(professorId, month) - Drizzle doesn't support table-level constraints easily in definition yet? 
    // actually it does with the third arg, but for now this is fine.
});

export const studentPayment = sqliteTable("studentPayment", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: real("amount"),
    type: text("type"),
    month: integer("month"),
    date: text("date"), // DATE
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    enrollmentId: integer("enrollmentId").references(() => enrollment.id),
});

export const bankOperation = sqliteTable("bankOperation", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: real("amount"),
    type: text("type"),
    description: text("description"),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    instituteId: integer("instituteId").references(() => institute.id),
});

export const cashierOperation = sqliteTable("cashierOperation", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: real("amount"),
    flux: text("flux"),
    description: text("description"),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    instituteId: integer("instituteId").references(() => institute.id),
});

export const charge = sqliteTable("charge", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: real("amount"),
    description: text("description"),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    instituteId: integer("instituteId").references(() => institute.id),
});

export const additional = sqliteTable("additional", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: real("amount"),
    description: text("description"),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
    instituteId: integer("instituteId").references(() => institute.id),
});

const schemaObject = {
    institute,
    user,
    session, 
    student,
    professor,
    subject,
    enrollment,
    professorPayment,
    studentPayment,
    bankOperation,
    cashierOperation,
    charge,
    additional,
};

export const schema = schemaObject;