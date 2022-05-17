import Button from '../ui/Button';

const MainHeader = () => {
  return (
    <header className="flex items-center place-content-between py-5 px-10 mb-10">
      <div>
        <img src="" alt="" />
        <h1 className="text-2xl font-bold text-white">Adventure Forge</h1>
      </div>
      <div className="flex">
        <Button value="Login" classes="mr-4" />
        <Button value="Sign up" style="outline" />
      </div>
    </header>
  );
};

export default MainHeader;
