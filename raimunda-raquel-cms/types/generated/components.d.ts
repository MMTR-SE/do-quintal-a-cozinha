import type { Schema, Struct } from '@strapi/strapi';

export interface ReceitaPasso extends Struct.ComponentSchema {
  collectionName: 'components_receita_passos';
  info: {
    displayName: 'Passo';
    icon: 'list';
  };
  attributes: {
    instruction: Schema.Attribute.Text & Schema.Attribute.Required;
    step_number: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'receita.passo': ReceitaPasso;
    }
  }
}
