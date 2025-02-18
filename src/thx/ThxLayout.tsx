import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import { useEffect } from 'react';
import sparkles from '../assets/sparkles.png';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  useEffect(() => {
    document.body.style.background = '#FFF';
    return () => {
      document.body.style.background = 'linear-gradient(133deg, #FF5494 2.58%, #D46DFA 50%, #3193FC 97.42%)';
    };
  }, []);

  return (
    <>
      <div className={thxSt.container}>
        <img src={sparkles} width={80} height={80} className={thxSt.rocket} />
        <Typography.TitleResponsive font="system" tag="h1" view="small" style={{ margin: '24px 0 12px' }} weight="bold">
          Подписка находится в режиме тестирования
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Следите за новостями, чтобы узнать, когда она станет доступной
        </Typography.Text>
      </div>
      <Gap size={96} />
      <div className={appSt.bottomBtn}>
        <ButtonMobile
          href="alfabank://investments"
          block
          view="secondary"
          onClick={() => window.gtag('event', 'wait_const_4205_var5')}
        >
          Буду ждать
        </ButtonMobile>
      </div>
    </>
  );
};
