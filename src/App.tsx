import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Gap } from '@alfalab/core-components/gap';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import { PopupSheet } from '@alfalab/core-components/popup-sheet';
import { SystemMessageMobile } from '@alfalab/core-components/system-message/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { useEffect, useState } from 'react';
import corner from './assets/corner.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';
const optionsGroup1 = [
  {
    title: 'Доход на остаток',
    price: '150 ₽',
    description: '12% на остаток от 100 000 ₽ на брокерском счёте',
  },
  {
    title: 'Торговля без комиссии',
    price: '150 ₽',
    description: '10 сделок с акциями, облигациями и фондами без комиссии',
  },
  {
    title: 'Увеличенное плечо',
    price: '999 ₽',
    description: 'На 30 000 ₽ больше размер плеча в маржинальной торговле без дополнительных комиссий',
  },
];

const optionsGroup2 = [
  {
    title: 'Инвест-инсайты',
    price: '99 ₽',
    description: 'Получайте стратегии и аналитику действий инвесторов',
  },
  {
    title: 'Закрытое сообщество',
    price: '99 ₽',
    description: 'Общение с топовыми инвесторами, экспертами и аналитиками',
  },
];

const optionsGroup3 = [
  {
    title: 'Ассистент по анализу рынка',
    price: '39 ₽',
    description: 'ИИ анализирует рынок и подсказывает, как действовать',
  },
  {
    title: 'Анализ изменения стоимости портфеля',
    price: '39 ₽',
    description: 'ИИ найдёт причины и объяснит, почему меняется доходность',
  },
  {
    title: 'Балансировка портфеля',
    price: '39 ₽',
    description: 'ИИ оценивает активы и даёт рекомендации по улучшению',
  },
  {
    title: 'Прогнозы по активу',
    price: '39 ₽',
    description: 'ИИ сформирует прогноз на основе мнений инвесторов и аналитиков',
  },
];

const optionsGroup4 = [
  {
    title: 'Приоритетное обслуживание',
    price: '39 ₽',
    description: 'Приоритетное обслуживание в офисах и чатах банка',
  },
  {
    title: 'Консультации экспертов',
    price: '39 ₽',
    description: 'Советы от ведущих аналитиков Альфа-Инвестиций',
  },
];
const optionsGroup5 = [
  {
    title: 'Подписка РБК Pro',
    price: '800 ₽',
    description: 'Доступ к аналитике и новостям РБК',
  },
  {
    title: 'Подписка РБК Pro + РБК Инвестиции',
    price: '1100 ₽',
    description: 'Глобальные обзоры рынков, экономик и инвестиций',
  },
  {
    title: 'Подписка на Ведомости',
    price: '690 ₽',
    description: 'Доступ к закрытым статьям на всех устройствах и без рекламы',
  },
];

const allGroups = optionsGroup1.concat(optionsGroup2, optionsGroup3, optionsGroup4, optionsGroup5);

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [options, setOptions] = useState<string[]>([]);
  const [options2, setOptions2] = useState<string[]>([]);
  const [options3, setOptions3] = useState<string[]>([]);
  const [options4, setOptions4] = useState<string[]>([]);
  const [options5, setOptions5] = useState<string[]>([]);

  const toggleOption1 = (option: string) => {
    const newOptions = options.includes(option) ? options.filter(item => item !== option) : [...options, option];
    setOptions(newOptions);
  };
  const toggleOption2 = (option: string) => {
    const newOptions = options2.includes(option) ? options2.filter(item => item !== option) : [...options2, option];
    setOptions2(newOptions);
  };
  const toggleOption3 = (option: string) => {
    const newOptions = options3.includes(option) ? options3.filter(item => item !== option) : [...options3, option];
    setOptions3(newOptions);
  };
  const toggleOption4 = (option: string) => {
    const newOptions = options4.includes(option) ? options4.filter(item => item !== option) : [...options4, option];
    setOptions4(newOptions);
  };
  const toggleOption5 = (option: string) => {
    const newOptions = options5.includes(option) ? options5.filter(item => item !== option) : [...options5, option];
    setOptions5(newOptions);
  };
  const allOptions = options.concat(options2, options3, options4, options5);
  const sum = allOptions.reduce((acc, item) => {
    const group = allGroups.find(({ title }) => title === item);
    const [price] = group?.price.split(' ') ?? ['0'];
    return acc + (group ? parseInt(price) : 0);
  }, 0);

  const submit = () => {
    if (!allOptions.length) {
      setError(true);
      return;
    }
    window.gtag('event', 'activate_constr_4205');
    setLoading(true);

    sendDataToGA({
      id: LS.getItem(LSKeys.UserId, null) ?? 0,
      benefit: JSON.stringify(options.map(o => optionsGroup1.indexOf(optionsGroup1.find(({ title }) => title === o)!) + 1)),
      insight: JSON.stringify(options2.map(o => optionsGroup2.indexOf(optionsGroup2.find(({ title }) => title === o)!) + 1)),
      tools: JSON.stringify(options3.map(o => optionsGroup3.indexOf(optionsGroup3.find(({ title }) => title === o)!) + 1)),
      personal: JSON.stringify(
        options4.map(o => optionsGroup4.indexOf(optionsGroup4.find(({ title }) => title === o)!) + 1),
      ),
      premium: JSON.stringify(options5.map(o => optionsGroup5.indexOf(optionsGroup5.find(({ title }) => title === o)!) + 1)),
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div style={{ color: '#fff', position: 'relative' }}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="xlarge" font="system" weight="semibold">
            PRO инвестиции
          </Typography.TitleResponsive>
          <div style={{ marginTop: '8px', maxWidth: '222px' }}>
            <Typography.Text view="primary-small">Выберите, что будет полезно именно вам</Typography.Text>
          </div>

          <div className={appSt.tag}>
            <CDNIcon className={appSt.calendar} name="glyph_calendar_m" />
            <Typography.Text view="primary-small" weight="bold">
              30 дней
            </Typography.Text>
          </div>

          <img src={corner} width={170} height={117} className={appSt.cornerImg} />
        </div>
      </div>
      <div className={appSt.containerBox}>
        <Typography.TitleResponsive style={{ marginTop: '8px' }} tag="h2" view="small" font="system" weight="semibold">
          Выгодные предложения
        </Typography.TitleResponsive>

        {optionsGroup1.map(({ title, description, price }) => (
          <div
            key={title}
            className={appSt.box}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleOption1(title);
            }}
          >
            <div className={appSt.row}>
              <Typography.Text tag="p" defaultMargins={false} view="primary-small" weight="bold">
                {title}
              </Typography.Text>
              <div className={appSt.rowSmall}>
                <Typography.Text view="component-primary">{price}</Typography.Text>
                <Checkbox size={24} checked={options.includes(title)} />
              </div>
            </div>
            <Typography.Text view="primary-small" color="secondary">
              {description}
            </Typography.Text>
          </div>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '8px' }} tag="h2" view="small" font="system" weight="semibold">
          Инсайты экспертов
        </Typography.TitleResponsive>

        {optionsGroup2.map(({ title, description, price }) => (
          <div
            key={title}
            className={appSt.box}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleOption2(title);
            }}
          >
            <div className={appSt.row}>
              <Typography.Text tag="p" defaultMargins={false} view="primary-small" weight="bold">
                {title}
              </Typography.Text>
              <div className={appSt.rowSmall}>
                <Typography.Text view="component-primary">{price}</Typography.Text>
                <Checkbox size={24} checked={options2.includes(title)} />
              </div>
            </div>
            <Typography.Text view="primary-small" color="secondary">
              {description}
            </Typography.Text>
          </div>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '8px' }} tag="h2" view="small" font="system" weight="semibold">
          Инструменты с ИИ
        </Typography.TitleResponsive>

        {optionsGroup3.map(({ title, description, price }) => (
          <div
            key={title}
            className={appSt.box}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleOption3(title);
            }}
          >
            <div className={appSt.row}>
              <Typography.Text tag="p" defaultMargins={false} view="primary-small" weight="bold">
                {title}
              </Typography.Text>
              <div className={appSt.rowSmall}>
                <Typography.Text view="component-primary">{price}</Typography.Text>
                <Checkbox size={24} checked={options3.includes(title)} />
              </div>
            </div>
            <Typography.Text view="primary-small" color="secondary">
              {description}
            </Typography.Text>
          </div>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '8px' }} tag="h2" view="small" font="system" weight="semibold">
          Персональный сервис
        </Typography.TitleResponsive>

        {optionsGroup4.map(({ title, description, price }) => (
          <div
            key={title}
            className={appSt.box}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleOption4(title);
            }}
          >
            <div className={appSt.row}>
              <Typography.Text tag="p" defaultMargins={false} view="primary-small" weight="bold">
                {title}
              </Typography.Text>
              <div className={appSt.rowSmall}>
                <Typography.Text view="component-primary">{price}</Typography.Text>
                <Checkbox size={24} checked={options4.includes(title)} />
              </div>
            </div>
            <Typography.Text view="primary-small" color="secondary">
              {description}
            </Typography.Text>
          </div>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '8px' }} tag="h2" view="small" font="system" weight="semibold">
          Премиум-контент
        </Typography.TitleResponsive>
        {optionsGroup5.map(({ title, description, price }) => (
          <div
            key={title}
            className={appSt.box}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleOption5(title);
            }}
          >
            <div className={appSt.row}>
              <Typography.Text tag="p" defaultMargins={false} view="primary-small" weight="bold">
                {title}
              </Typography.Text>
              <div className={appSt.rowSmall}>
                <Typography.Text view="component-primary">{price}</Typography.Text>
                <Checkbox size={24} checked={options5.includes(title)} />
              </div>
            </div>
            <Typography.Text view="primary-small" color="secondary">
              {description}
            </Typography.Text>
          </div>
        ))}
        <Gap size={96} />
      </div>

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          loading={loading}
          block
          view="primary"
          onClick={submit}
          hint={sum ? `Итого: ${sum}₽ в месяц` : undefined}
        >
          Подключить
        </ButtonMobile>
      </div>

      <PopupSheet open={error} onClose={() => setError(false)} padding={0}>
        <SystemMessageMobile padding={32}>
          <SystemMessageMobile.Graphic padding={{ bottom: 24 }}>
            <SuperEllipse size={80}>
              <CDNIcon name="glyph_exclamation_m" color="var(--color-light-neutral-translucent-1300)" />
            </SuperEllipse>
          </SystemMessageMobile.Graphic>

          <SystemMessageMobile.Title>Выберите хотя бы одно предложение</SystemMessageMobile.Title>

          <SystemMessageMobile.Subtitle>
            Чтобы подключить подписку, отметьте хотя бы один из доступных вариантов
          </SystemMessageMobile.Subtitle>

          <SystemMessageMobile.Controls>
            <ButtonMobile size="m" block view="primary" onClick={() => setError(false)}>
              Понятно
            </ButtonMobile>
          </SystemMessageMobile.Controls>
        </SystemMessageMobile>
      </PopupSheet>
    </>
  );
};
