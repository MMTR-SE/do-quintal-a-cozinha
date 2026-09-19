import { agendarRemocao, agendarSincronizacao } from "../../../../utils/cms-sync";

/**
 * Avisa o site quando o conteudo muda no CMS: criacao/edicao -> o site puxa o
 * conteudo; remocao -> o site apaga o registro correspondente no Postgres.
 */
export default {
  afterCreate() {
    agendarSincronizacao();
  },
  afterUpdate() {
    agendarSincronizacao();
  },
  afterDelete(event: any) {
    agendarRemocao("historias", event?.result);
  },
};
