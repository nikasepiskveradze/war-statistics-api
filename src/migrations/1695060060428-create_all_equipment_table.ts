import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllEquipmentTable1695060060428 implements MigrationInterface {
    name = 'CreateAllEquipmentTable1695060060428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "all_equipment" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "type" character varying NOT NULL, "destroyed" integer NOT NULL, "abandoned" integer NOT NULL, "captured" integer NOT NULL, "damaged" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_b2b79dfc8fcca1b4fc339b0b648" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "all_equipment"`);
    }

}
