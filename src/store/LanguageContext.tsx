'use client';

import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Language} from '@/types';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    market: 'Market',
    tasks: 'Tasks',
    home: 'Home',
    farmpad: 'FarmPad',
    web3: 'Web3',

    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    completeQuest: 'Complete Quest',
    start: 'Start',
    coins: 'Coins',
    reward: 'Reward',
    duckygramDescription: 'Dive into Duckygram, collect ducks and win extra reward',

    marketPage: 'Market Page',
    homePage: 'Home Page',
    farmPadPage: 'FarmPad Page',
    web3Page: 'Web3 Page',

    task1: {
      title: 'Breed a duck',
      description: 'Dive into Duckygram, collect ducks and win extra reward!',
    },
    task2: {
      title: 'Farm 1 $EGG',
      description: 'Dive into Duckygram, collect ducks and win extra reward!',
    },
    task3: {
      title: 'Hatch a duck',
      description: 'Dive into Duckygram, collect ducks and win extra reward!',
    },
  },
  ru: {
    market: 'Маркет',
    tasks: 'Задания',
    home: 'Главная',
    farmpad: 'Фермпад',
    web3: 'Веб3',

    settings: 'Настройки',
    theme: 'Тема',
    language: 'Язык',
    light: 'Светлая',
    dark: 'Темная',
    completeQuest: 'Завершить Квест',
    start: 'Начать',
    coins: 'Монет',
    reward: 'Награда',
    duckygramDescription: 'Погрузитесь в Duckygram, собирайте уток и получайте дополнительные награды',

    marketPage: 'Маркет Страница',
    homePage: 'Главная Страница',
    farmPadPage: 'Фермпад Страница',
    web3Page: 'Веб3 Страница',

    task1: {
      title: 'Вывести утку',
      description: 'Погрузитесь в Duckygram, собирайте уток и получайте дополнительные награды!',
    },
    task2: {
      title: 'Заработать 1 $EGG',
      description: 'Погрузитесь в Duckygram, собирайте уток и получайте дополнительные награды!',
    },
    task3: {
      title: 'Вылупить утку',
      description: 'Погрузитесь в Duckygram, собирайте уток и получайте дополнительные награды!',
    },

  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({children}: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang === 'ru' ? 'ru' : 'en');
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value;
  };


  return (
    <LanguageContext.Provider value={{language, setLanguage: handleLanguageChange, t}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
