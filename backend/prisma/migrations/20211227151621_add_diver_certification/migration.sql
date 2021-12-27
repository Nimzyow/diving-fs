-- CreateTable
CREATE TABLE "DiverCertification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiverCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiverCertificationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiverCertificationToUser_AB_unique" ON "_DiverCertificationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DiverCertificationToUser_B_index" ON "_DiverCertificationToUser"("B");

-- AddForeignKey
ALTER TABLE "_DiverCertificationToUser" ADD FOREIGN KEY ("A") REFERENCES "DiverCertification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiverCertificationToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
