CREATE TYPE "credit_application_status" AS ENUM('draft', 'pending', 'rejected', 'approved');--> statement-breakpoint
CREATE TABLE "credit_application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"principal_amount" numeric NOT NULL,
	"tenor_month" integer NOT NULL,
	"annual_interest_rate" numeric NOT NULL,
	"interest_amount" numeric NOT NULL,
	"total_repayment_amount" numeric NOT NULL,
	"monthly_installment_amount" numeric NOT NULL,
	"status" "credit_application_status" DEFAULT 'draft'::"credit_application_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar
);
