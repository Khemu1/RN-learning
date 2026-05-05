import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompletedColumn1777985679001 implements MigrationInterface {
    name = 'AddCompletedColumn1777985679001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed"`);
    }

}
