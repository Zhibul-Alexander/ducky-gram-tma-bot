'use client';

import {useState, useEffect} from 'react';
import {useLanguage} from '@/store/LanguageContext';
import {useTheme} from '@/store/ThemeContext';
import TaskCard from './TaskCard';
import {Task, UserTask} from '@/types';
import styled from 'styled-components';
import Image from 'next/image';
import Coin from '@/images/Coin.png';
import Duck from '@/images/Duck.png';
import ButtonBackground from '@/images/ButtonBackground.png';

const Container = styled.div<{theme: string}>`
  padding: 24px 16px;
  color: white;
  background-color: ${({theme}) => theme === 'dark' ? '#1E1E1E' : '#FFFFFF'};
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const DuckContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const DuckImage = styled(Image)`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  background-color: #6C5CE7;
  border-radius: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const Description = styled.p<{theme: string}>`
  color: ${({theme}) => theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#8c8c8c'};
  font-size: 12px;
`;

const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const CoinIcon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const RewardText = styled.span<{theme: string}>`
  font-size: 12px;
  color: ${({theme}) => theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#000000'};
`;

const ProgressContainer = styled.div`
  position: relative;
  
  margin: 40px 0 20px 0;
`;

const ProgressBar = styled.div<{theme: string}>`
  width: 100%;
  height: 16px;
  background-color: ${({theme}) => theme === 'dark' ? '#2D2D2D' : '#F0F0F0'};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
`;

const ProgressFill = styled.div<{ width: string, theme: string }>`
  height: 100%;
  background-color: ${({theme}) => theme === 'dark' ? '#000000' : '#E9C048'};
  border-radius: 8px;
  width: ${props => props.width};
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  
  font-size: 12px;
`;

const CompleteButton = styled.button`
  width: 100%;
  padding: 9px;
  background-image: url(${ButtonBackground.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 0 4px 0 0 #000;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div<{theme: string}>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({theme}) => theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#8c8c8c'};
  border-radius: 50%;
  border-top-color: ${({theme}) => theme === 'dark' ? 'white' : 'black'};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  margin-top: 40px;
`;

export default function TaskList() {
  const {t} = useLanguage();
  const {theme} = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userTasks, setUserTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(3);
  const [userId, setUserId] = useState<string | null>(null);
  const [claimingReward, setClaimingReward] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const mockTasks: Task[] = [
    {
      id: '1',
      title: t('task1.title'),
      description: t('task1.description'),
      reward: 500.00,
      image_url: '/images/duck_coin.png'
    },
    {
      id: '2',
      title: t('task2.title'),
      description: t('task2.description'),
      reward: 500.00,
      image_url: '/images/duck_coin.png'
    },
    {
      id: '3',
      title: t('task3.title'),
      description: t('task3.description'),
      reward: 500.00,
      image_url: '/images/duck_coin.png'
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setUserTasks([]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTaskComplete = async (taskId: string) => {
    if (userTasks.some(task => task.task_id === taskId && task.completed)) {
      return;
    }

    setTimeout(() => {
      const newUserTask: UserTask = {
        id: `ut-${Date.now()}`,
        user_id: 'mock-user',
        task_id: taskId,
        completed: true,
        completed_at: new Date().toISOString()
      };

      setUserTasks(prev => [...prev, newUserTask]);
      setCompletedCount(prev => prev + 1);
    }, 3000);
  };

  const handleClaimReward = async () => {
    if (completedCount < totalCount) return;

    setClaimingReward(true);

    setTimeout(() => {
      setRewardClaimed(true);
      setClaimingReward(false);
    }, 3000);
  };

  if (loading) {
    return (
      <Container theme={theme}>
        <div style={{display: 'flex', justifyContent: 'center', padding: '32px'}}>
          <Spinner/>
        </div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header>
        <DuckContainer>
          <DuckImage src={Duck} alt="Duck" title="Duck" aria-label="Duck"/>
          <div>
            <Title className='text-black dark:text-white'>Duckygram</Title>
            <Description theme={theme}>{t('duckygramDescription')}!</Description>
            <RewardContainer>
              <CoinIcon src={Coin} alt="Coin" title="Coin" aria-label="Coin"/>
              <RewardText theme={theme}>{t('reward')}: <span className='font-bold text-black dark:text-white'>190.00k</span></RewardText>
            </RewardContainer>
          </div>
        </DuckContainer>
      </Header>

      <ProgressContainer>
        <ProgressBar theme={theme}>
          <ProgressFill width={`${(completedCount / totalCount) * 100}%`} theme={theme}/>
        </ProgressBar>
        <ProgressText className='font-bold text-black dark:text-white'>
          {completedCount}/{totalCount}
        </ProgressText>
      </ProgressContainer>

      {completedCount === totalCount && !rewardClaimed && (
        <CompleteButton
          onClick={handleClaimReward}
          disabled={claimingReward}
          className='text-white dark:text-dark'
        >
          {claimingReward ? <Spinner theme={theme}/> : t('completeQuest')}
        </CompleteButton>
      )}

      <TasksContainer>
        {tasks.map((task) => {
          const userTask = userTasks.find(ut => ut.task_id === task.id);
          return (
            <TaskCard
              key={task.id}
              task={task}
              completed={!!userTask?.completed}
              onComplete={() => handleTaskComplete(task.id)}
            />
          );
        })}
      </TasksContainer>
    </Container>
  );
}
