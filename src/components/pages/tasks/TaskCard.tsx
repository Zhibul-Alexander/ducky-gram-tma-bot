"use client";

import { useState } from 'react';
import { Task } from '@/types';
import styled from 'styled-components';
import Coin from '@/images/Coin.png';
import Star from '@/images/Star.png';
import Image from "next/image"
import {useTheme} from '@/store/ThemeContext';
import {useLanguage} from '@/store/LanguageContext';

interface TaskCardProps {
  task: Task;
  completed: boolean;
  onComplete: () => void;
}

const Card = styled.div<{theme: string}>`
  background-color: ${({ theme }) => theme === 'dark' ? '#2D2D2D' : '#F0F0F0'};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIconContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  overflow: hidden;
`;

const CoinImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TaskDetails = styled.div``;

const TaskTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 2px;
`;

const TaskReward = styled.p<{theme: string}>`
  font-size: 12px;
  color: ${({theme}) => theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#8c8c8c'};
  margin: 0;
`;

const CheckButton = styled.button<{backgroundColor?: string, height?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 84px;
  height: ${({ height = '32px'}) => height};

  border: none;
  border-radius: 20px;
  
  font-size: 14px;

  color: white;
  
  background-color: ${({ backgroundColor = '#000000'}) => backgroundColor};
`;

const StarImage = styled(Image)`
  width: 18px;
  height: 18px;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function TaskCard({ task, completed, onComplete }: TaskCardProps) {
  const {t} = useLanguage();
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (completed || loading) return;

    setLoading(true);
    onComplete();
  };

  return (
    <Card theme={theme}>
      <TaskInfo>
        <CoinIconContainer>
          <CoinImage src={Coin} alt="Coin" title="Coin" aria-label="Coin"  />
        </CoinIconContainer>
        <TaskDetails>
          <TaskTitle className='text-black dark:text-white'>{task.title}</TaskTitle>
          <TaskReward theme={theme}>+{task.reward?.toFixed(2)}k {t('coins')}</TaskReward>
        </TaskDetails>
      </TaskInfo>

      {completed ? (
        <CheckButton backgroundColor="#22C55E" height="36px">
          <StarImage src={Star} alt="Completed" title="Completed" aria-label="Completed" />
        </CheckButton>
      ) : (
        <CheckButton onClick={handleComplete} disabled={loading}>
          {loading ? <Spinner /> : t('start')}
        </CheckButton>
      )}
    </Card>
  );
}
