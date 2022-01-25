import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrderAndOrderBookTables1643119658915 implements MigrationInterface {
    name = 'UpdateOrderAndOrderBookTables1643119658915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_books" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
