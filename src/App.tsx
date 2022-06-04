import { useKeycloak } from '@react-keycloak/web';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/ui/Loader';

const Home = lazy(() => import('./pages/Home'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const UserAccount = lazy(() => import('./pages/UserAccount'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { initialized } = useKeycloak();

  useEffect(() => {
    initialized ? setIsLoading(false) : setIsLoading(true);
  }, [initialized]);

  return (
    <>
      {!isLoading ? (
        <PageLayout>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              }
            />

            {/* PRIVATE ROUTES */}
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRoute allowedRoles={['USER, ADMIN']} />
                </Suspense>
              }
            >
              <Route path="account" element={<UserAccount />} />
            </Route>
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRoute allowedRoles={['ADMIN']} />
                </Suspense>
              }
            >
              <Route path="admin" element={<Admin />}>
                <Route path=":adminSubPage" element={<Admin />} />
              </Route>
            </Route>

            {/* Not found */}
            <Route
              path="unauthorized"
              element={
                <Suspense fallback={<Loader />}>
                  <Unauthorized />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </PageLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
