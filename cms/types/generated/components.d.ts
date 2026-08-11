import type { Schema, Struct } from '@strapi/strapi';

export interface ReceitaPasso extends Struct.ComponentSchema {
  collectionName: 'components_receita_passos';
  info: {
    displayName: 'Passo da receita';
  };
  attributes: {
    instrucao: Schema.Attribute.Text & Schema.Attribute.Required;
    numero: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface TelefoneContato extends Struct.ComponentSchema {
  collectionName: 'components_telefone_contatoes';
  info: {
    displayName: 'contato';
  };
  attributes: {
    numero: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'receita.passo': ReceitaPasso;
      'telefone.contato': TelefoneContato;
    }
  }
}
