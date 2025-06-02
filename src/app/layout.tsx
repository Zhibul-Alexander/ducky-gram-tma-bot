"use client";

import { ThemeProvider } from '@/store/ThemeContext';
import { LanguageProvider } from '@/store/LanguageContext';
import TelegramSettings from '@/components/layout/TelegramSettings';
import Navigation from '@/components/layout/Navigation';
import '@/styles/globals.css';
import {useEffect} from 'react';
import {initializeDatabase} from '@/lib/supabase/api';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeDatabase().catch(error => {
      console.error('Error initializing database:', error);
    });
  }, []);


  return (
    <html lang="en">
    <head>
      <script src="https://telegram.org/js/telegram-web-app.js"></script>
    </head>
    <body>
    <ThemeProvider>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <TelegramSettings />
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
          <Navigation />
        </div>
      </LanguageProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
