import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrderBookTable1643117277618 implements MigrationInterface {
    name = 'UpdateOrderBookTable1643117277618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "PK_e0e39f7be7e1bc314e246b6508f"`);
        await queryRunner.query(`ALTER TABLE "order_books" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "PK_e0e39f7be7e1bc314e246b6508f" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "PK_e0e39f7be7e1bc314e246b6508f"`);
        await queryRunner.query(`ALTER TABLE "order_books" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "PK_e0e39f7be7e1bc314e246b6508f" PRIMARY KEY ("id")`);
    }

}
