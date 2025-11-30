
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_municipalityId_fkey";

-- AlterTable: Remove municipalityId from budgets
ALTER TABLE "budgets" DROP COLUMN IF EXISTS "municipalityId";

-- AlterTable: Remove municipalityId from expenditures
ALTER TABLE "expenditures" DROP COLUMN IF EXISTS "municipalityId";

-- AlterTable: Remove municipalityId from projects
ALTER TABLE "projects" DROP COLUMN IF EXISTS "municipalityId";

-- AlterTable: Remove municipalityId from contracts
ALTER TABLE "contracts" DROP COLUMN IF EXISTS "municipalityId";

-- AlterTable: Remove municipalityId from users
ALTER TABLE "users" DROP COLUMN IF EXISTS "municipalityId";

-- DropTable
DROP TABLE IF EXISTS "municipalities";
