import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/outline';
import ButtonLink from '../ui/ButtonLink';

const MainHeader = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  const loginHandler = () => {
    keycloak.login();
  };

  const signUpHandler = () => {
    keycloak.register();
  };

  const logoutHandler = () => {
    keycloak.logout();
  };

  const profileHandler = () => {
    keycloak.accountManagement();
  };

  return (
    <header className="flex items-center place-content-between py-5 px-10 z-10 bg-slate-900">
      <div>
        <img src="" alt="" />
        <h1
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate('/')}
        >
          Adventure Forge
        </h1>
      </div>
      {initialized && !keycloak.authenticated && (
        <div className="flex">
          <ButtonLink value="Login" className="mr-4" onClick={loginHandler} />
          <ButtonLink value="Sign up" style="outline" onClick={signUpHandler} />
        </div>
      )}
      {initialized && keycloak.authenticated && (
        <div className="flex">
          <ButtonLink
            value={keycloak?.tokenParsed?.preferred_username}
            className="mr-4"
            onClick={profileHandler}
          >
            <UserCircleIcon className="w-5 inline-block" />
          </ButtonLink>
          <ButtonLink value="Logout" style="outline" onClick={logoutHandler} />
        </div>
      )}
    </header>
  );
};

export default MainHeader;
