import React from 'react';
import { getAllCasesAdmin } from '@/src/lib/cases';
import { AdminCasesDashboard } from '@/src/components/admin/AdminCasesDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminProjetosPage() {
  const { cases, tableMissing } = await getAllCasesAdmin();
  return <AdminCasesDashboard initialCases={cases} tableMissing={tableMissing} />;
}

