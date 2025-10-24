import { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadingComplete, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-hero transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <img
          src={logo}
          alt="Amora Gifts"
          className="h-24 w-24 animate-scale-in"
        />
        <h1 className="text-4xl font-serif text-primary-foreground animate-fade-in">
          Amora Gifts
        </h1>
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse delay-100" />
          <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
