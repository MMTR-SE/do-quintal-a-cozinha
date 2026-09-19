import { agendarSincronizacao } from "../../../../utils/cms-sync";

/**
 * Sempre que um item muda no CMS, avisa o site (com um pequeno atraso, para o
 * item ja estar visivel na API REST) para sincronizar com o Postgres.
 */
export default {
  afterCreate() {
    agendarSincronizacao();
  },
  afterUpdate() {
    agendarSincronizacao();
  },
  afterDelete() {
    agendarSincronizacao();
  },
};
