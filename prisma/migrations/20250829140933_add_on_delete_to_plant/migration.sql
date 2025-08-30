-- DropForeignKey
ALTER TABLE "public"."Plant" DROP CONSTRAINT "Plant_gardenId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Plant" ADD CONSTRAINT "Plant_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "public"."Garden"("gardenId") ON DELETE CASCADE ON UPDATE CASCADE;
