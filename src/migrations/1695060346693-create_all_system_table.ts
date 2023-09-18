import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllSystemTable1695060346693 implements MigrationInterface {
    name = 'CreateAllSystemTable1695060346693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "all_system" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "system" character varying NOT NULL, "destroyed" integer NOT NULL, "abandoned" integer NOT NULL, "captured" integer NOT NULL, "damaged" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_9007a9d1d8ac87bc672e85f0da0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "all_system"`);
    }

}
