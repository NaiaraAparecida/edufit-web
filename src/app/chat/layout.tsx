import type { ReactNode } from 'react';
import Protected from '@/components/Protected';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <Protected>{children}</Protected>;
}

