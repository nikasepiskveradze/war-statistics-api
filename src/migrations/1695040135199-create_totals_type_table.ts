import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTotalsTypeTable1695040135199 implements MigrationInterface {
    name = 'CreateTotalsTypeTable1695040135199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "totals_type" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "type" character varying NOT NULL, "destroyed" integer NOT NULL, "abandoned" integer NOT NULL, "captured" integer NOT NULL, "damaged" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_9d722d149c0b638de34647507a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "totals_type"`);
    }

}
