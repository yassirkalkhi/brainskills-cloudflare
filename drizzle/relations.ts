import { relations } from "drizzle-orm/relations";
import { institute, additional, bankOperation, cashierOperation, charge, enrollment, professor, subject, student, professorPayment, user, session, studentPayment } from "./schema";

export const additionalRelations = relations(additional, ({one}) => ({
	institute: one(institute, {
		fields: [additional.instituteId],
		references: [institute.id]
	}),
}));

export const instituteRelations = relations(institute, ({many}) => ({
	additionals: many(additional),
	bankOperations: many(bankOperation),
	cashierOperations: many(cashierOperation),
	charges: many(charge),
	enrollments: many(enrollment),
	users: many(user),
}));

export const bankOperationRelations = relations(bankOperation, ({one}) => ({
	institute: one(institute, {
		fields: [bankOperation.instituteId],
		references: [institute.id]
	}),
}));

export const cashierOperationRelations = relations(cashierOperation, ({one}) => ({
	institute: one(institute, {
		fields: [cashierOperation.instituteId],
		references: [institute.id]
	}),
}));

export const chargeRelations = relations(charge, ({one}) => ({
	institute: one(institute, {
		fields: [charge.instituteId],
		references: [institute.id]
	}),
}));

export const enrollmentRelations = relations(enrollment, ({one, many}) => ({
	institute: one(institute, {
		fields: [enrollment.instituteId],
		references: [institute.id]
	}),
	professor: one(professor, {
		fields: [enrollment.professorId],
		references: [professor.id]
	}),
	subject: one(subject, {
		fields: [enrollment.subjectId],
		references: [subject.id]
	}),
	student: one(student, {
		fields: [enrollment.studentId],
		references: [student.id]
	}),
	studentPayments: many(studentPayment),
}));

export const professorRelations = relations(professor, ({many}) => ({
	enrollments: many(enrollment),
	professorPayments: many(professorPayment),
}));

export const subjectRelations = relations(subject, ({many}) => ({
	enrollments: many(enrollment),
}));

export const studentRelations = relations(student, ({many}) => ({
	enrollments: many(enrollment),
}));

export const professorPaymentRelations = relations(professorPayment, ({one}) => ({
	professor: one(professor, {
		fields: [professorPayment.professorId],
		references: [professor.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({one, many}) => ({
	sessions: many(session),
	institute: one(institute, {
		fields: [user.instituteId],
		references: [institute.id]
	}),
}));

export const studentPaymentRelations = relations(studentPayment, ({one}) => ({
	enrollment: one(enrollment, {
		fields: [studentPayment.enrollmentId],
		references: [enrollment.id]
	}),
}));