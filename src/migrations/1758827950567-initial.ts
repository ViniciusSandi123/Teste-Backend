import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758827950567 implements MigrationInterface {
    name = 'Initial1758827950567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorito\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usuario_id\` int NULL, \`unidade_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`unidades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`torre\` varchar(100) NOT NULL, \`numero\` varchar(10) NOT NULL, \`metro_quadrado\` int NOT NULL, \`preco\` int NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`empreendimento_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empreendimentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cidade\` varchar(100) NOT NULL, \`Uf\` varchar(2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favorito\` ADD CONSTRAINT \`FK_5d079087dcc7287043f4d82455e\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`favorito\` ADD CONSTRAINT \`FK_b0746ae85e081bd7eea8f1896d9\` FOREIGN KEY (\`unidade_id\`) REFERENCES \`unidades\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`unidades\` ADD CONSTRAINT \`FK_db514f6f841bb996e41152173eb\` FOREIGN KEY (\`empreendimento_id\`) REFERENCES \`empreendimentos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`unidades\` DROP FOREIGN KEY \`FK_db514f6f841bb996e41152173eb\``);
        await queryRunner.query(`ALTER TABLE \`favorito\` DROP FOREIGN KEY \`FK_b0746ae85e081bd7eea8f1896d9\``);
        await queryRunner.query(`ALTER TABLE \`favorito\` DROP FOREIGN KEY \`FK_5d079087dcc7287043f4d82455e\``);
        await queryRunner.query(`DROP TABLE \`empreendimentos\``);
        await queryRunner.query(`DROP TABLE \`unidades\``);
        await queryRunner.query(`DROP TABLE \`favorito\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
