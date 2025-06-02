'use client';

import { useTheme } from '@/store/ThemeContext';
import TaskList from '@/components/pages/tasks/TaskList';
import { ModalOverlay, ModalContent, CloseButton, BannerImage } from '@/components/modals/styles';

import Banner from '@/images/Banner.png';

interface TasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TasksModal({ isOpen, onClose }: TasksModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <CloseButton onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.77367 5.26425L11 8.49059L14.2263 5.26426L13.625 3.125C13.625 1.67534 14.8003 0.5 16.25 0.5C17.6997 0.5 18.875 1.67534 18.875 3.125C20.3247 3.125 21.5 4.30034 21.5 5.75C21.5 7.19965 20.3246 8.375 18.875 8.375L16.7357 7.77367L13.5094 11L16.7357 14.2263L18.875 13.625C20.3246 13.625 21.5 14.8003 21.5 16.25C21.5 17.6997 20.3247 18.875 18.875 18.875C18.875 20.3247 17.6997 21.5 16.25 21.5C14.8003 21.5 13.625 20.3247 13.625 18.875L14.2263 16.7357L11 13.5094L7.77367 16.7357L8.375 18.875C8.375 20.3247 7.19965 21.5 5.75 21.5C4.30034 21.5 3.125 20.3247 3.125 18.875C1.67534 18.875 0.5 17.6997 0.5 16.25C0.5 14.8003 1.67534 13.625 3.125 13.625L5.26425 14.2263L8.49058 11L5.26425 7.77367L3.125 8.375C1.67534 8.375 0.5 7.19965 0.5 5.75C0.5 4.30034 1.67534 3.125 3.125 3.125C3.125 1.67534 4.30034 0.5 5.75 0.5C7.19965 0.5 8.375 1.67534 8.375 3.125L7.77367 5.26425Z"
            fill={theme === 'dark' ? '#000000' : '#FFFFFF'}/>
        </svg>
      </CloseButton>
      <BannerImage src={Banner} alt="Banner" title="Banner" aria-label="Banner" />
      <ModalContent>
        <TaskList />
      </ModalContent>
    </ModalOverlay>
  );
}
