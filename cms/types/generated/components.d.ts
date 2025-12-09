import type { Schema, Struct } from '@strapi/strapi';

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
      'telefone.contato': TelefoneContato;
    }
  }
}
