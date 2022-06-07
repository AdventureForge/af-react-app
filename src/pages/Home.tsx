import { useRef } from 'react';

import tavern from '../assets/images/tavern.jpg';
import typewriter from '../assets/images/markus-winkler-_nvKjg0aliA-unsplash.jpg';
import dice from '../assets/images/alperen-yazgi-QuP5RL_E5oE-unsplash.jpg';
import books from '../assets/images/inaki-del-olmo-NIJuEQw0RKg-unsplash.jpg';
import ButtonLink from '../components/ui/ButtonLink';
import Card from '../components/ui/Card';
import Section from '../components/layout/Section';

const Home = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <>
      <Section className="px-40 py-24">
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
            <ButtonLink
              value="Your Journey Starts Here"
              className="mt-10"
              to="user"
            />
          </div>
        </div>
      </Section>
      <Section className="px-40 py-24">
        <h2 className="text-4xl text-center mb-8 font-semibold">
          Create your adventures for your favourite Roleplaying Games
        </h2>
        <div className="flex h-96">
          <Card classes="w-1/3 bg-slate-700 font-semibold hover:scale-105 hover:rotate-2 transition p-10">
            <img
              src={books}
              alt=""
              className="h-40 w-48 mb-6 m-auto border origin-center border-transparent rounded-lg overflow-hidden block object-cover shadow-xl"
              ref={imageRef}
            />
            <p className="text-violet-100 text-2xl text-center">
              Choose among a large catalog of games...
            </p>
          </Card>
          <Card classes="w-1/3 bg-slate-700 font-semibold hover:scale-105 hover:rotate-2 transition p-10">
            <img
              src={typewriter}
              alt=""
              className="h-40 w-48 mb-6 m-auto border origin-center border-transparent rounded-lg overflow-hidden block object-cover shadow-xl"
              ref={imageRef}
            />
            <p className="text-violet-100 text-2xl text-center">
              ...build your adventures with our creators tools...
            </p>
          </Card>
          <Card classes="w-1/3 bg-violet-700 font-semibold hover:scale-105 hover:rotate-2 transition p-10">
            <img
              src={dice}
              alt=""
              className="h-40 w-48 mb-6 m-auto border origin-center border-transparent rounded-lg overflow-hidden block object-cover shadow-xl"
              ref={imageRef}
            />
            <p className="text-violet-100 text-2xl text-center">...and play!</p>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Home;
