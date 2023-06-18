import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Skeleton } from 'antd';

import routes from './config/routers';
import useQueryClientConfig from './config/useQueryClientConfig';

function App() {
  const queryClient = useQueryClientConfig();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Skeleton />}>
        <RouterProvider router={routes} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
