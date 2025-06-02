import styled from 'styled-components';
import Image from "next/image"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
  
  background-color: rgba(0, 0, 0, 0.5);
  
  padding: 24px 10px 20px 10px;
  box-sizing: border-box;
`;

export const ModalContent = styled.div`
  background-color: #1E1E1E;
  border-radius: 16px;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 40px;
  height: 40px;
  background-color: #F87C56;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 60;
`;

export const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
  background-color: #6C5CE7;
`;