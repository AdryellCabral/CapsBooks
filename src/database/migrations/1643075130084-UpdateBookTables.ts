import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBookTables1643075130084 implements MigrationInterface {
    name = 'UpdateBookTables1643075130084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "price" numeric(5,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "price" integer NOT NULL`);
    }

}
