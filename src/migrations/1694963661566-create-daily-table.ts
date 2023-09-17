import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDailyTable1694963661566 implements MigrationInterface {
  name = 'CreateDailyTable1694963661566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "daily" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "type" character varying NOT NULL, "destroyed" integer NOT NULL, "abandoned" integer NOT NULL, "captured" integer NOT NULL, "damaged" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_2f5e6c9d57ae96fad69b6f97bd5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "daily"`);
  }
}
