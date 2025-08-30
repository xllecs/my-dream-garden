-- DropForeignKey
ALTER TABLE "public"."Garden" DROP CONSTRAINT "Garden_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Garden" ADD CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
