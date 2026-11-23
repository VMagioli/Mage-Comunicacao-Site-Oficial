import React from 'react';
import { MarketingShell } from '@/src/components/MarketingShell';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingShell>{children}</MarketingShell>;
}
