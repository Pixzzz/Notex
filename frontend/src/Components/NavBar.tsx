import React from "react";
interface SearchProps {
  Search: string;
  setSearch: (value: string) => void;
  onLogOut: () => void;
}

const NavBar: React.FC<SearchProps> = ({Search, setSearch, onLogOut}) => {
  return (
    <>
      {/*NavBar*/}
      <div className="flex shadow-sm p-4">
        {/*Logo o Titulo*/}
        <div className="flex items-center text-black font-semibold text-xl">
          Notes
        </div>
        {/*Buscador*/}
        <div className="flex items-center justify-center flex-grow">
          <input
            type="text"
            value={Search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-100 w-full max-w-sm rounded-sm p-2 "
          />
        </div>

        {/*Imagen del usuario*/}
        <div>
          <img
            className="w-8 h-8 rounded-full"
            src="https://avatars.githubusercontent.com/u/122415616?v=4&size=64"
            alt="user-pfp"
          />
        </div>
        {/*Nombre de usuario*/}
        <div className="flex flex-col justify-center items-end">
          <span className="text-md font-medium">User-name</span>
          <a href="#" onClick={onLogOut} className="text-sm hover:underline hover:text-red-700">
            Log Out
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
