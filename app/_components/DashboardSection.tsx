'use client';

import { ReactNode } from 'react';
import { DashboardSectionErrorBoundary } from './ErrorBoundary';

interface DashboardSectionProps {
  children: ReactNode;
  sectionName: string;
  fallback?: ReactNode;
  className?: string;
}

export function DashboardSection({ 
  children, 
  sectionName, 
  fallback,
  className 
}: DashboardSectionProps) {
  return (
    <div className={className}>
      <DashboardSectionErrorBoundary 
        sectionName={sectionName}
        fallback={fallback}
      >
        {children}
      </DashboardSectionErrorBoundary>
    </div>
  );
}

// Specific section wrappers for common dashboard components
export function ChartSection({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <DashboardSection sectionName="Chart" fallback={fallback}>
      {children}
    </DashboardSection>
  );
}

export function StatsSection({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <DashboardSection sectionName="Statistics" fallback={fallback}>
      {children}
    </DashboardSection>
  );
}

export function TableSection({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <DashboardSection sectionName="Data Table" fallback={fallback}>
      {children}
    </DashboardSection>
  );
}

export function CardSection({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <DashboardSection sectionName="Card" fallback={fallback}>
      {children}
    </DashboardSection>
  );
}