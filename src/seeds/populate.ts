import { AppDataSource } from '../configs/data-source';
import { Empreendimento } from '../modules/Empreendimentos/entities/empreendimento.entity';
import { Unidade } from '../modules/Unidades/entities/unidade.entity';

async function seed() {
  const ds = await AppDataSource.initialize();

  const empreendimentosRepo = ds.getRepository(Empreendimento);
  const unidadesRepo = ds.getRepository(Unidade);

  // Populando empreendimentos
  const empreendimentos = [
    { nome: 'Residencial Spazio Vitta', cidade: 'Caxias do Sul', Uf: 'RS' },
    { nome: 'Residencial Zezinho', cidade: 'Caxias do Sul', Uf: 'RS' },
    { nome: 'Residencial Monte Alegre', cidade: 'Gramado', Uf: 'RS' },
    { nome: 'Condomínio Parque das Flores', cidade: 'Bento Gonçalves', Uf: 'RS' },
    { nome: 'Residencial Jardim Itália', cidade: 'Caxias do Sul', Uf: 'RS' },
    { nome: 'Condomínio Vale Verde', cidade: 'Porto Alegre', Uf: 'RS' },
  ];

  const savedEmpreendimentos = await empreendimentosRepo.save(empreendimentos);

  // Populando unidades
  const unidades = [
    { torre: 'Torre', numero: '620', metro_quadrado: 50, preco: 180000, status: 2, empreendimento: savedEmpreendimentos[2] },
    { torre: 'Torre A', numero: '101', metro_quadrado: 50, preco: 250000, status: 1, empreendimento: savedEmpreendimentos[1] },
    { torre: 'Torre 2', numero: '1505', metro_quadrado: 27, preco: 120000, status: 3, empreendimento: savedEmpreendimentos[1] },
    { torre: 'Torre B', numero: '201', metro_quadrado: 60, preco: 200000, status: 1, empreendimento: savedEmpreendimentos[1] },
    { torre: 'Torre B', numero: '202', metro_quadrado: 62, preco: 210000, status: 1, empreendimento: savedEmpreendimentos[1] },
    { torre: 'Torre C', numero: '301', metro_quadrado: 55, preco: 180000, status: 2, empreendimento: savedEmpreendimentos[2] },
    { torre: 'Torre A', numero: '101', metro_quadrado: 50, preco: 250000, status: 1, empreendimento: savedEmpreendimentos[3] },
    { torre: 'Torre 1', numero: '1102', metro_quadrado: 75, preco: 300000, status: 1, empreendimento: savedEmpreendimentos[4] },
    { torre: 'Torre Central', numero: '504', metro_quadrado: 80, preco: 350000, status: 3, empreendimento: savedEmpreendimentos[5] },
  ];

  await unidadesRepo.save(unidades);

  console.log('Seed finalizado!');
  await ds.destroy();
}

seed().catch((err) => {
  console.error('Erro ao popular banco', err);
});
