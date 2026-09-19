import { agendarRemocao, agendarSincronizacao } from "../../../../utils/cms-sync";

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
