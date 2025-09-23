import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoTabelaFavoritos1758588002028 implements MigrationInterface {
    name = 'AlterandoTabelaFavoritos1758588002028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`favorito\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usuario_id\` int NULL, \`unidade_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favorito\` ADD CONSTRAINT \`FK_5d079087dcc7287043f4d82455e\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`favorito\` ADD CONSTRAINT \`FK_b0746ae85e081bd7eea8f1896d9\` FOREIGN KEY (\`unidade_id\`) REFERENCES \`unidades\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorito\` DROP FOREIGN KEY \`FK_b0746ae85e081bd7eea8f1896d9\``);
        await queryRunner.query(`ALTER TABLE \`favorito\` DROP FOREIGN KEY \`FK_5d079087dcc7287043f4d82455e\``);
        await queryRunner.query(`DROP TABLE \`favorito\``);
    }

}
