"use client";

import { useTheme } from '@/store/ThemeContext';
import { useLanguage } from '@/store/LanguageContext';

export default function MarketPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
  <div className={theme}>
    <h1 className="text-2xl font-bold">{t('marketPage')}</h1>
  </div>
  );
}
