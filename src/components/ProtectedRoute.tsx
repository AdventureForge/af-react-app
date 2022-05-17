import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

type Props = {
  allowedRoles: string[];
};

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const [isAllowed, setIsAllowed] = useState(true);
  const [isRolesVerified, setIsRolesVerified] = useState(false);
  const auth = { roles: ['user'], user: 'toto' };
  const location = useLocation();

  useEffect(() => {
    const roles = auth.roles.find((role) => allowedRoles.includes(role));
    const rolesAllowed: boolean = roles ? true : false;
    setIsAllowed(rolesAllowed);
    setIsRolesVerified(true);
  }, []);

  const evaluateReponse = () => {
    if (isRolesVerified) {
      return (
        <>
          {isAllowed && <Outlet />}
          {!isAllowed && auth?.user && (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
          )}
          {!isAllowed && !auth.user && (
            <Navigate to="/login" state={{ from: location }} replace />
          )}
        </>
      );
    }
  };

  return <>{evaluateReponse()}</>;
};

export default ProtectedRoute;
