import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="loader animate-spin ease-linear rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
    </div>
  );
};

export default Loader;
