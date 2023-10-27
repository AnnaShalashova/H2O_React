import { useRoutes } from 'react-router';
import { routerConfig } from './routerConfig';
import { Suspense } from 'react';
import { Loader } from '../../components/Loader';

export const ReactRouter = () => {
  const routes = useRoutes(routerConfig);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
};
