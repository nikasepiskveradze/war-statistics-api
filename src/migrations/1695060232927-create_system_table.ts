import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSystemTable1695060232927 implements MigrationInterface {
    name = 'CreateSystemTable1695060232927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "system" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "origin" character varying NOT NULL, "system" character varying NOT NULL, "status" character varying NOT NULL, "url" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_6b1e6b6f88da9888fde62379945" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "system"`);
    }

}
