import { useRef } from 'react';

import MainHeader from '../components/layout/MainHeader';
import tavern from '../assets/images/tavern.jpg';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <>
      <MainHeader />
      <section className="px-40 py-5">
        <div className="flex flex-row">
          <div className="relative w-1/2 h-96">
            <img
              src={tavern}
              alt=""
              className="h-full w-full mr-10 border origin-center border-transparent rounded-lg overflow-hidden block object-cover absolute z-50"
              ref={imageRef}
            />
            <div className="h-full w-full bg-cyan-500 rotate-6 transition ease-out rounded-lg origin-center absolute z-30"></div>
            <div className="h-full w-full bg-purple-500 rotate-3 rounded-lg transition ease-out origin-center absolute z-40"></div>
          </div>
          <div className="w-1/2 pl-20">
            <p className="text-5xl font-bold text-fuchsia-50 text leading-snug">
              Adventure Forge your new companion to create you next roleplaying
              game adventure
            </p>
            <Button value="Discover" classes="mt-10" />
          </div>
        </div>
      </section>
      <section className="px-40 py-5">
        <div className="flex h-96">
          <Card classes="w-1/3">
            <img src="" alt="" />
            <p>test 1</p>
          </Card>
          <Card classes="w-1/3">
            <img src="" alt="" />
            <p>test 2</p>
          </Card>
          <Card classes="w-1/3">
            <img src="" alt="" />
            <p>test 3</p>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Home;