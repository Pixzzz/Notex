import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { getInitials } from "../utils/getInitials"; // Assuming you have a utility function to get initials
interface SearchProps {
  Search: string;
  onClick: () => void;
  setSearch: (value: string) => void;
  onLogOut: () => void;
  userName: string; // Optional prop for user name
}

const NavBar: React.FC<SearchProps> = ({
  Search,
  setSearch,
  onLogOut,
  onClick,
  userName,
}) => {
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
          <div onClick={onClick} className="cursor-pointer">
            <SearchIcon className="cursor-pointer flex gap-4"/>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          {/*Imagen del usuario*/}
        <div className="w-12 h-12 rounded-full font-bold text-xl flex justify-center items-center bg-green-100">
          {getInitials(userName)}
        </div>
        {/*Nombre de usuario*/}
        <div className="flex flex-col justify-center items-end">
          <span className="text-md font-medium">{userName}</span>
          <a
            href="#"
            onClick={onLogOut}
            className="text-sm hover:underline hover:text-red-700"
          >
            Log Out
          </a>
        </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
