import type { ReactNode } from 'react';
import { Suspense } from 'react';
import OverviewSkeleton from './loading';

async function Layout ({ 
  children 
}: { 
  children: ReactNode
}) {
  return (
    <div id="overview-layout" className='relative' data-testid="overview-layout">
      <Suspense fallback={<OverviewSkeleton />}>
        { children }
      </Suspense>
    </div>
  );
}

export default Layout;
