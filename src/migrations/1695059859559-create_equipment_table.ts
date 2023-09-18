import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEquipmentTable1695059859559 implements MigrationInterface {
    name = 'CreateEquipmentTable1695059859559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "equipment" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "type" character varying NOT NULL, "destroyed" integer NOT NULL, "abandoned" integer NOT NULL, "captured" integer NOT NULL, "damaged" integer NOT NULL, "total" integer NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "equipment"`);
    }

}
