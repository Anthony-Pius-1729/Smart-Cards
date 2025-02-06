import React from "react";

const Library = () => {
  return (
    <>
      <div className="items-center min-h-screen max-h-full bg-gray-200">
        <h1 className="text-xl uppercase font-black">Library</h1>
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="w-64 h-64 bg-white m-4 p-4 rounded-lg shadow-xl">
              <h1 className="text-xl font-bold">Card 1</h1>
              <p className="text-gray-500">Description of Card 1</p>
            </div>
            <div className="w-64 h-64 bg-white m-4 p-4 rounded-lg shadow-xl">
              <h1 className="text-xl font-bold">Card 2</h1>
              <p className="text-gray-500">Description of Card 2</p>
            </div>
            <div className="w-64 h-64 bg-white m-4 p-4 rounded-lg shadow-xl">
              <h1 className="text-xl font-bold">Card 3</h1>
              <p className="text-gray-500">Description of Card 3</p>
            </div>
            <div className="w-64 h-64 bg-white m-4 p-4 rounded-lg shadow-xl">
              <h1 className="text-xl font-bold">Card 4</h1>
              <p className="text-gray-500">Description of Card 4</p>
            </div>
            <div className="w-64 h-64 bg-white m-4 p-4 rounded-lg shadow-xl">
              <h1 className="text-xl font-bold">Card 4</h1>
              <p className="text-gray-500">Description of Card 4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
