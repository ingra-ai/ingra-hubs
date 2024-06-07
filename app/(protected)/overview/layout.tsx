import type { ReactNode } from 'react';
import { Suspense } from 'react';
import OverviewPage from './page';
import OverviewSkeleton from './loading';

async function Layout ({ 
  searchParams,
  children 
}: { 
  searchParams: Record<string, string | string[] | undefined>,
  children: ReactNode
}) {
  return (
    <div id="overview-layout" className='relative' data-testid="overview-layout">
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewPage />
      </Suspense>
    </div>
  );
}

export default Layout;
