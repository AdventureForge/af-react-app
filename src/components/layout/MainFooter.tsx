import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import GitHubIcon from '../../assets/svg/GitHubIcon';
import LinkedinIcon from '../../assets/svg/LinkedinIcon';
import ButtonLink from '../ui/ButtonLink';
import CircleIcon from '../ui/CircleIcon';

const MainFooter = () => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <footer className="text-center bg-zinc-900 text-white z-10 relative">
      <div className="container px-6 pt-6">
        <div className="flex justify-center mb-6">
          <CircleIcon link="https://www.linkedin.com/in/morgan-lombard-37502976/">
            <LinkedinIcon />
          </CircleIcon>
          <CircleIcon link="https://github.com/AdventureForge">
            <GitHubIcon />
          </CircleIcon>
        </div>

        <div>
          <form action="">
            <div className="grid md:grid-cols-3 gird-cols-1 gap-4 flex justify-center items-center">
              <div className="md:ml-auto md:mb-6">
                <p className="text-violet-500">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="md:mb-6">
                <input
                  type="text"
                  className="
                border-2 rounded-full py-2 px-8 cursor-text text-base border-violet-500
                form-control
                block
                w-full
                font-normal
                bg-transparent bg-clip-padding
                border-solid
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                />
              </div>

              <div className="md:mr-auto mb-6">
                <ButtonLink value="subscribe" style="outline" />
              </div>
            </div>
          </form>
        </div>

        <div className="mb-6">
          <p className="italic">
            Adventure Forge, a new way to build your roleplaying game
            adventures. <br />
            Forget your old text editor, instead build your stories in a modern,
            modular and story centered way!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2">
          <div className="mb-6">
            <h5 className="uppercase font-bold mb-2.5">Links</h5>

            <ul className="list-none mb-0">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6"></div>

          <div className="mb-6"></div>
          {initialized && keycloak.hasRealmRole('ADMIN') && (
            <div className="mb-6">
              <h5 className="uppercase font-bold mb-2.5">Admin</h5>

              <ul className="list-none mb-0">
                <li>
                  <Link to="/admin" className="text-white">
                    Administration
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="text-center p-4 bg-black">
        © 2022{' '}
        <a className="text-white" href="https://github.com/AdventureForge">
          Adventure Forge
        </a>
      </div>
    </footer>
  );
};

export default MainFooter;
