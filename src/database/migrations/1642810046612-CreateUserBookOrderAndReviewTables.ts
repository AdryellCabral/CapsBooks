import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserBookOrderAndReviewTables1642810046612 implements MigrationInterface {
    name = 'CreateUserBookOrderAndReviewTables1642810046612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "closed" boolean NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_adm" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "comment" character varying NOT NULL, "review" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "bookId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_books_books" ("ordersId" uuid NOT NULL, "booksId" uuid NOT NULL, CONSTRAINT "PK_c93e3112b4bf01cc04d68342630" PRIMARY KEY ("ordersId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7405d68875807de33eccc56e08" ON "orders_books_books" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f18a7687034245bdee1f98447c" ON "orders_books_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_cab4e55252a9c18a27e81415299" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_books_books" ADD CONSTRAINT "FK_7405d68875807de33eccc56e082" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_books_books" ADD CONSTRAINT "FK_f18a7687034245bdee1f98447cd" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_books_books" DROP CONSTRAINT "FK_f18a7687034245bdee1f98447cd"`);
        await queryRunner.query(`ALTER TABLE "orders_books_books" DROP CONSTRAINT "FK_7405d68875807de33eccc56e082"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_cab4e55252a9c18a27e81415299"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f18a7687034245bdee1f98447c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7405d68875807de33eccc56e08"`);
        await queryRunner.query(`DROP TABLE "orders_books_books"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
