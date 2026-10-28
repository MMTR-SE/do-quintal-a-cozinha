type TradOptions = Record<string, string>;

const prefixPluginTranslations = (
  trad: TradOptions,
  pluginId: string,
): TradOptions => {
  if (!pluginId) {
    throw new TypeError("pluginId não pode ser vazio");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {} as TradOptions);
};

export { prefixPluginTranslations };