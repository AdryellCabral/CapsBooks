import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReviewTable1642768821454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reviews",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "review",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "comment",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "book_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reviews");
  }
}
