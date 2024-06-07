import { Suspense, type ReactNode, type PropsWithChildren } from 'react';
import FunctionListPage from './page';
import FunctionListSkeleton from './loading';

async function Layout ({ 
  searchParams,
  children 
}: { 
  searchParams: Record<string, string | string[] | undefined>,
  children: ReactNode
}) {
  return (
    <div className='relative' data-testid="function-mine-layout">
      <Suspense fallback={<FunctionListSkeleton />}>
        <FunctionListPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Layout;
