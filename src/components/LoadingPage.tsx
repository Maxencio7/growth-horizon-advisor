
import React from 'react';
import { Loading } from '@/components/ui/loading';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Loading variant="page" text="Loading your investments" />
    </div>
  );
};

export default LoadingPage;
