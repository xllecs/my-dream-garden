-- CreateEnum
CREATE TYPE "public"."PlantType" AS ENUM ('vegetable', 'fruit', 'flower');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER,
    "emailAddress" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Garden" (
    "gardenId" TEXT NOT NULL,
    "gardenName" TEXT NOT NULL,
    "totalSurfaceArea" DOUBLE PRECISION NOT NULL,
    "locationDescription" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Garden_pkey" PRIMARY KEY ("gardenId")
);

-- CreateTable
CREATE TABLE "public"."Plant" (
    "plantId" TEXT NOT NULL,
    "plantName" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "plantType" "public"."PlantType" NOT NULL,
    "plantationDate" TIMESTAMP(3) NOT NULL,
    "surfaceAreaRequired" DOUBLE PRECISION NOT NULL,
    "idealHumidityLevel" DOUBLE PRECISION NOT NULL,
    "gardenId" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("plantId")
);

-- CreateTable
CREATE TABLE "public"."RealtimePlantMetric" (
    "plantId" TEXT NOT NULL,
    "lastIrrigationStartTime" TIMESTAMP(3),
    "lastIrrigationEndTime" TIMESTAMP(3),
    "currentHumidityLevel" DOUBLE PRECISION,

    CONSTRAINT "RealtimePlantMetric_pkey" PRIMARY KEY ("plantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "public"."User"("emailAddress");

-- AddForeignKey
ALTER TABLE "public"."Garden" ADD CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plant" ADD CONSTRAINT "Plant_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "public"."Garden"("gardenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RealtimePlantMetric" ADD CONSTRAINT "RealtimePlantMetric_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("plantId") ON DELETE RESTRICT ON UPDATE CASCADE;
