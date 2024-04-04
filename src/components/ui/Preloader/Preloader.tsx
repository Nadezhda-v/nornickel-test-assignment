import { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface PreloaderProps {
  color: string;
  size?: number;
}

export const Preloader: FC<PreloaderProps> = ({ color, size }) => (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <ClipLoader color={color} size={size} />
  </div>
);
