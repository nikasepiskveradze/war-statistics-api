import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedDateColumnToDailyTable1694965941395
  implements MigrationInterface
{
  name = 'AddedDateColumnToDailyTable1694965941395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "daily" ADD "date" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "daily" DROP COLUMN "date"`);
  }
}
