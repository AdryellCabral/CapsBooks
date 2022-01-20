import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddReferencesOnOrderBooks1642721125123
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "order_books",
      new TableForeignKey({
        name: "OrdersFK",
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "orders",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "order_books",
      new TableForeignKey({
        name: "BooksFK",
        columnNames: ["book_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "books",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("order_books", "OrdersFK");
    await queryRunner.dropForeignKey("order_books", "BooksFK");
  }
}
