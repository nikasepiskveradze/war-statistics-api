import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSystemWideTable1695039052914 implements MigrationInterface {
    name = 'CreateSystemWideTable1695039052914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "system_wide" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "system" character varying NOT NULL, "destroyed" integer NOT NULL, "abandoned" integer NOT NULL, "captured" integer NOT NULL, "damaged" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_4e04460a5cfcebf7a9d5cec3c55" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "system_wide"`);
    }

}
