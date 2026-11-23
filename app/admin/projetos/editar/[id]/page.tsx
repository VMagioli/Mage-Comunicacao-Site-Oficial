import React from 'react';
import { notFound } from 'next/navigation';
import { getCaseByIdAdmin } from '@/src/lib/cases';
import { CaseEditor } from '@/src/components/admin/CaseEditor';

export const dynamic = 'force-dynamic';

interface EditCasePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditCasePage({ params }: EditCasePageProps) {
  const { id } = await params;
  const projectCase = await getCaseByIdAdmin(id);

  if (!projectCase) {
    notFound();
  }

  return <CaseEditor initialCase={projectCase} />;
}

