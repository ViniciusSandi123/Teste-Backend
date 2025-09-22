import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoTabelaUnidades1758583918502 implements MigrationInterface {
    name = 'AlterandoTabelaUnidades1758583918502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`unidades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`torre\` varchar(100) NOT NULL, \`numero\` varchar(10) NOT NULL, \`metro_quadrado\` int NOT NULL, \`preco\` int NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`empreendimento_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`unidades\` ADD CONSTRAINT \`FK_db514f6f841bb996e41152173eb\` FOREIGN KEY (\`empreendimento_id\`) REFERENCES \`empreendimentos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`unidades\` DROP FOREIGN KEY \`FK_db514f6f841bb996e41152173eb\``);
        await queryRunner.query(`DROP TABLE \`unidades\``);
    }

}
