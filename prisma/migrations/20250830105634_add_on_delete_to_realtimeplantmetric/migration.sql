-- DropForeignKey
ALTER TABLE "public"."RealtimePlantMetric" DROP CONSTRAINT "RealtimePlantMetric_plantId_fkey";

-- AddForeignKey
ALTER TABLE "public"."RealtimePlantMetric" ADD CONSTRAINT "RealtimePlantMetric_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("plantId") ON DELETE CASCADE ON UPDATE CASCADE;
