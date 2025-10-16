import type { ReactNode } from 'react';
import Protected from '@/components/Protected';

export default function ChallengesLayout({ children }: { children: ReactNode }) {
  return <Protected>{children}</Protected>;
}

