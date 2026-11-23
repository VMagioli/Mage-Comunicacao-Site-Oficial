import React from 'react';
import { getAllPostsAdmin } from '@/src/lib/posts';
import { AdminPostsDashboard } from '@/src/components/admin/AdminPostsDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const { posts, tableMissing } = await getAllPostsAdmin();
  return <AdminPostsDashboard initialPosts={posts} tableMissing={tableMissing} />;
}
