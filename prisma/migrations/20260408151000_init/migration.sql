-- Create enums
CREATE TYPE "ChecklistType" AS ENUM ('OPENING', 'CLOSING', 'CLEANING', 'CUSTOM');
CREATE TYPE "IncidentCategory" AS ENUM ('CUSTOMER_ISSUE', 'STAFF_ISSUE', 'INJURY', 'THEFT', 'AGGRESSION', 'PROPERTY_DAMAGE', 'INTOXICATION', 'REFUSAL_OF_ENTRY', 'EJECTION', 'OTHER');
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE "ShiftType" AS ENUM ('OPENING', 'DAYTIME', 'EVENING', 'CLOSING', 'OVERNIGHT');
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'URGENT');
CREATE TYPE "TemplateCategory" AS ENUM ('OPERATIONS', 'SECURITY', 'STAFFING', 'STOCK_CONTROL', 'FINANCE', 'SOPS');

CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ChecklistType" NOT NULL,
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "checklistId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "completedAt" TIMESTAMP(3),
    "completedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "IncidentReport" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "category" "IncidentCategory" NOT NULL,
    "severity" "Severity" NOT NULL,
    "location" TEXT,
    "peopleInvolved" TEXT,
    "description" TEXT NOT NULL,
    "actionTaken" TEXT,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "followUpNotes" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "IncidentReport_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "shiftType" "ShiftType" NOT NULL,
    "priority" "Priority" NOT NULL,
    "operationalIssues" TEXT,
    "staffingNotes" TEXT,
    "revenueNotes" TEXT,
    "followUpNeeded" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TemplateResource" (
    "id" TEXT NOT NULL,
    "venueId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TemplateCategory" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TemplateResource_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_venueId_idx" ON "User"("venueId");
CREATE INDEX "Checklist_venueId_isArchived_idx" ON "Checklist"("venueId", "isArchived");
CREATE INDEX "ChecklistItem_checklistId_sortOrder_idx" ON "ChecklistItem"("checklistId", "sortOrder");
CREATE INDEX "IncidentReport_venueId_occurredAt_idx" ON "IncidentReport"("venueId", "occurredAt");
CREATE INDEX "IncidentReport_venueId_severity_idx" ON "IncidentReport"("venueId", "severity");
CREATE INDEX "IncidentReport_venueId_category_idx" ON "IncidentReport"("venueId", "category");
CREATE INDEX "DailyLog_venueId_createdAt_idx" ON "DailyLog"("venueId", "createdAt");
CREATE INDEX "TemplateResource_venueId_isPublished_idx" ON "TemplateResource"("venueId", "isPublished");
CREATE INDEX "TemplateResource_category_idx" ON "TemplateResource"("category");

ALTER TABLE "User" ADD CONSTRAINT "User_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_completedByUserId_fkey" FOREIGN KEY ("completedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "IncidentReport" ADD CONSTRAINT "IncidentReport_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "IncidentReport" ADD CONSTRAINT "IncidentReport_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TemplateResource" ADD CONSTRAINT "TemplateResource_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
