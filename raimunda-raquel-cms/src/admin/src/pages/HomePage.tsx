import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';


const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <h1>
        {formatMessage({
          id: getTranslation('plugin.name'),
          defaultMessage: 'Meu Painel',
        })}
      </h1>
      <p>
        {formatMessage({
          id: getTranslation('plugin.description'),
          defaultMessage: 'Painel de Controle do Site MMTR-SE',
        })}
      </p>
    </div>
  );
};

export default HomePage;