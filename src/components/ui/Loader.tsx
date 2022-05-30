const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center space-x-2">
      <div
        className="animate-spin inline-block w-14  h-14 border-4 border-r-transparent rounded-full border-violet-500"
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
