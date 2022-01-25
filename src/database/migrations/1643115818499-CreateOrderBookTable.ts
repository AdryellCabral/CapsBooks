import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrderBookTable1643115818499 implements MigrationInterface {
    name = 'CreateOrderBookTable1643115818499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_books" ("id" SERIAL NOT NULL, "bookId" uuid NOT NULL, "orderId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e0e39f7be7e1bc314e246b6508f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "FK_256befc6be703355ca26db3583f" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "FK_357dd0b18828670a7271e81d7cf" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "FK_357dd0b18828670a7271e81d7cf"`);
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "FK_256befc6be703355ca26db3583f"`);
        await queryRunner.query(`DROP TABLE "order_books"`);
    }

}
