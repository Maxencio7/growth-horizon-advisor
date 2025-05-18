
import React from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, LoaderCircle } from "lucide-react";

interface LoadingProps {
  className?: string;
  variant?: 'default' | 'card' | 'page';
  text?: string;
}

export function Loading({ className, variant = 'default', text = 'Loading...' }: LoadingProps) {
  const renderDefault = () => (
    <div className={cn("flex items-center justify-center flex-col gap-2", className)}>
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );

  const renderCard = () => (
    <div className={cn("p-6 space-y-4", className)}>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );

  const renderPage = () => (
    <div className={cn("flex items-center justify-center flex-col gap-4 py-12", className)}>
      <div className="relative">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
        <DollarSign className="h-6 w-6 absolute inset-0 m-auto text-primary-foreground" />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-lg text-primary mb-1">{text}</h3>
        <p className="text-sm text-muted-foreground">Preparing your financial dashboard...</p>
      </div>
      <div className="w-full max-w-md space-y-3 mt-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5 mx-auto" />
        <Skeleton className="h-3 w-3/5 mx-auto" />
      </div>
    </div>
  );

  switch (variant) {
    case 'card':
      return renderCard();
    case 'page':
      return renderPage();
    default:
      return renderDefault();
  }
}
