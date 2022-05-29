import { useKeycloak } from '@react-keycloak/web';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

type Props = {
  allowedRoles: string[];
};

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const { keycloak, initialized } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  const location = useLocation();

  const isAuthorized = (roles: string[]) => {
    if (initialized && roles) {
      return roles.some((role) => {
        const realm = keycloak.hasRealmRole(role);
        const resource = keycloak.hasResourceRole(role);
        return realm || resource;
      });
    }
    return false;
  };

  const evaluateReponse = () => {
    if (initialized) {
      return (
        <>
          {!isLoggedIn && keycloak.login()}
          {isAuthorized(allowedRoles) && <Outlet />}
          {!isAuthorized(allowedRoles) && (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
          )}
        </>
      );
    } else {
      <p>Loading</p>;
    }
  };

  return <>{evaluateReponse()}</>;
};

export default ProtectedRoute;
