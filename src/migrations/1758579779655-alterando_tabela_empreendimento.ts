import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoTabelaEmpreendimento1758579779655 implements MigrationInterface {
    name = 'AlterandoTabelaEmpreendimento1758579779655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`empreendimentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cidade\` varchar(100) NOT NULL, \`Uf\` varchar(2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`empreendimentos\``);
    }

}
