import React from 'react';
import { notFound } from 'next/navigation';
import { getPostByIdAdmin } from '@/src/lib/posts';
import { PostEditor } from '@/src/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);

  if (!post) {
    notFound();
  }

  return <PostEditor initialPost={post} />;
}

