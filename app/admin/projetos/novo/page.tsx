import React from 'react';
import { CaseEditor } from '@/src/components/admin/CaseEditor';
import type { CaseType } from '@/src/lib/cases';

interface NewCasePageProps {
  searchParams: Promise<{ tipo?: string }>;
}

const VALID_TYPES = new Set<CaseType>(['site', 'social', 'google']);

export default async function AdminNewCasePage({ searchParams }: NewCasePageProps) {
  const params = await searchParams;
  const defaultType: CaseType =
    params?.tipo && VALID_TYPES.has(params.tipo as CaseType)
      ? (params.tipo as CaseType)
      : 'social';

  return <CaseEditor defaultType={defaultType} />;
}

