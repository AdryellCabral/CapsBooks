import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddReferencesOnReviews1642770933778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "reviews",
      new TableForeignKey({
        name: "UsersFK",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "reviews",
      new TableForeignKey({
        name: "BooksFK",
        columnNames: ["bookId"],
        referencedColumnNames: ["id"],
        referencedTableName: "books",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("reviews", "UsersFK");
    await queryRunner.dropForeignKey("reviews", "BooksFK");
  }
}
