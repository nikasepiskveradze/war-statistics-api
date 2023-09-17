import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnsInAbandoneTable1694978741363
  implements MigrationInterface
{
  name = 'UpdateColumnsInAbandoneTable1694978741363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "origin" character varying NOT NULL, "system" character varying NOT NULL, "status" character varying NOT NULL, "url" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
