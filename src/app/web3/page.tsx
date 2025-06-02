'use client';

import {useTheme} from '@/store/ThemeContext';
import {useLanguage} from '@/store/LanguageContext';

export default function Web3Page() {
  const {theme} = useTheme();
  const {t} = useLanguage();

  return (
    <div className={theme}>
      <h1 className="text-2xl font-bold">{t('web3Page')}</h1>
    </div>
  );
}
