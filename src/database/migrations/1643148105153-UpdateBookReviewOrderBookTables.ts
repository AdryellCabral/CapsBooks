import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBookReviewOrderBookTables1643148105153 implements MigrationInterface {
    name = 'UpdateBookReviewOrderBookTables1643148105153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "FK_256befc6be703355ca26db3583f"`);
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "FK_357dd0b18828670a7271e81d7cf"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_cab4e55252a9c18a27e81415299"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "author" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "FK_256befc6be703355ca26db3583f" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "FK_357dd0b18828670a7271e81d7cf" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_cab4e55252a9c18a27e81415299" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_cab4e55252a9c18a27e81415299"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "FK_357dd0b18828670a7271e81d7cf"`);
        await queryRunner.query(`ALTER TABLE "order_books" DROP CONSTRAINT "FK_256befc6be703355ca26db3583f"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_cab4e55252a9c18a27e81415299" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "FK_357dd0b18828670a7271e81d7cf" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_books" ADD CONSTRAINT "FK_256befc6be703355ca26db3583f" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
