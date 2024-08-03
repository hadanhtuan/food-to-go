import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1722591522895 implements MigrationInterface {
  name = 'Init1722591522895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dish" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "price" bigint NOT NULL DEFAULT '0', "name" character varying NOT NULL, "time_to_make" integer NOT NULL, "image" jsonb NOT NULL, "kitchenId" integer, CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."restaurant_status_enum" AS ENUM('CLOSE', 'OPEN', 'BAN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "lat" character varying NOT NULL, "long" character varying NOT NULL, "manager_id" character varying NOT NULL, "manager_name" character varying NOT NULL, "number_employees" bigint NOT NULL DEFAULT '0', "open_hour" integer, "close_hour" integer, "status" "public"."restaurant_status_enum" NOT NULL DEFAULT 'CLOSE', CONSTRAINT "CHK_3c085fb49f7977fb4f42249f7f" CHECK ("close_hour" >= 0 AND "close_hour" < 24), CONSTRAINT "CHK_f29742094aed6f3386ed8b44f9" CHECK ("open_hour" >= 0 AND "open_hour" < 24), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "kitchen" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "restaurantId" integer, CONSTRAINT "PK_c79a8f2cdbce1ce12d7198fe344" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish" ADD CONSTRAINT "FK_94f93f0b86562d0ef806f9b8493" FOREIGN KEY ("kitchenId") REFERENCES "kitchen"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kitchen" ADD CONSTRAINT "FK_87b8f1d75bbb1db78d5d7b4d3b0" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kitchen" DROP CONSTRAINT "FK_87b8f1d75bbb1db78d5d7b4d3b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish" DROP CONSTRAINT "FK_94f93f0b86562d0ef806f9b8493"`,
    );
    await queryRunner.query(`DROP TABLE "kitchen"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(`DROP TYPE "public"."restaurant_status_enum"`);
    await queryRunner.query(`DROP TABLE "dish"`);
  }
}
