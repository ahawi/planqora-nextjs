/*
  Warnings:

  - Added the required column `ownerId` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AddColumn
ALTER TABLE "Space"
ADD COLUMN "ownerId" TEXT;

-- BackfillExistingSpaces
UPDATE "Space"
SET "ownerId" = (
  SELECT "id"
  FROM "user"
  WHERE "email" = 'ivan@ivan.ru'
)
WHERE "ownerId" IS NULL;

-- MakeColumnRequired
ALTER TABLE "Space"
ALTER COLUMN "ownerId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Space_ownerId_idx"
ON "Space"("ownerId");

-- AddForeignKey
ALTER TABLE "Space"
ADD CONSTRAINT "Space_ownerId_fkey"
FOREIGN KEY ("ownerId")
REFERENCES "user"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;