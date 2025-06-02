"use client";

import { useEffect, useState } from 'react';
import { useTheme } from '@/store/ThemeContext';
import { useLanguage } from '@/store/LanguageContext';

export default function TelegramSettings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // @ts-ignore
    const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

    setTimeout(() => {
      setIsLoading(false);

      if (tg && tg.initDataUnsafe && Object.keys(tg.initDataUnsafe).length > 0) {
        setIsTelegramWebApp(true);

        try {
          tg.ready();
          tg.expand();

          const savedTheme = localStorage.getItem('theme');
          if (savedTheme) {
            setTheme(savedTheme as 'light' | 'dark');
          }

          const savedLanguage = localStorage.getItem('language');
          if (savedLanguage) {
            setLanguage(savedLanguage as 'en' | 'ru');
          }
        } catch (error) {
          console.error('Error initializing Telegram Web App:', error);
        }
      } else {
        setIsTelegramWebApp(false);
      }
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed top-4 right-4 z-50 w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('settings' )}</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">{t('theme' )}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setTheme('dark');
                    localStorage.setItem('theme', 'dark');
                  }}
                  className={`px-4 py-2 rounded-md bg-gray-200 text-black dark:bg-gray-700 dark:text-white ${theme === 'dark' && 'border-2 border-white'}`}
                >
                  {t('dark')}
                </button>
                <button
                  onClick={() => {
                    setTheme('light');
                    localStorage.setItem('theme', 'light');
                  }}
                  className={`px-4 py-2 rounded-md bg-gray-200 text-black dark:bg-gray-700 dark:text-white ${theme === 'light' && 'border-2 border-black'}`}
                >
                  {t('light')}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2">{t('language')}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setLanguage('en');
                    localStorage.setItem('language', 'en');
                  }}
                  className={`px-4 py-2 rounded-md bg-gray-200 text-black dark:bg-gray-700 dark:text-white ${language === 'en' && `border-2 ${theme === 'dark' ? 'border-white' : 'border-black'}`}`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage('ru');
                    localStorage.setItem('language', 'ru');
                  }}
                  className={`px-4 py-2 rounded-md bg-gray-200 text-black dark:bg-gray-700 dark:text-white ${language === 'ru' && `border-2 ${theme === 'dark' ? 'border-white' : 'border-black'}`}`}
                >
                  Русский
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
