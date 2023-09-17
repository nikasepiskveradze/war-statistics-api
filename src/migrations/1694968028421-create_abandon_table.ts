import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAbandonTable1694968028421 implements MigrationInterface {
    name = 'CreateAbandonTable1694968028421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "abandoned" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "origin" character varying NOT NULL, "system" character varying NOT NULL, "url" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_0122425538a3dc486074d00593b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "abandoned"`);
    }

}
