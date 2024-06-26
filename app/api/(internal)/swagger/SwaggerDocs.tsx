'use client';

import type { FC } from 'react';
import dynamic from 'next/dynamic';

const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <p>Loading Component...</p>,
});

type ReactSwaggerProps = {
  spec: Record<string, any>;
};

const ReactSwagger: FC<ReactSwaggerProps> = (props) => {
  const { spec } = props;
  return <DynamicSwaggerUI spec={spec} />;
};

export default ReactSwagger;
