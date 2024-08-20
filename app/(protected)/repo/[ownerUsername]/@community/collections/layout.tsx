import { Suspense, type ReactNode, type PropsWithChildren } from 'react';
import SubscriptionListSkeleton from './loading';
import { APP_NAME } from '@lib/constants';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: ['Collection Subscriptions', APP_NAME].join(' | '),
}

async function Layout ({ 
  children 
}: { 
  children: ReactNode
}) {
  return (
    <Suspense fallback={<SubscriptionListSkeleton />}>
      { children }
    </Suspense>
  );
}

export default Layout;