import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserBookOrderAndReviewTables1642865646014 implements MigrationInterface {
    name = 'UpdateUserBookOrderAndReviewTables1642865646014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "book_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "book_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "title" character varying NOT NULL`);
    }

}
