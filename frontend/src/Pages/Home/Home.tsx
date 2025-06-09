import NavBar from "../../Components/NavBar";
import InfotNote from "../../Components/InfotNote";
import Modal from "../../Components/Modals/Modal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if(!token){
      Navigate("/");
    }
  }, []);

  const hadleLogOut = () =>{
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    Navigate("/")
  }

  const OpenModal = () => setIsModalOpen(true);
  const CloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <NavBar Search={search} setSearch={setSearch} onLogOut={hadleLogOut} />
      <div className="flex justify-center mt-4">
        <button
          onClick={OpenModal}
          className="bg-green-800 hover:bg-green-600 text-white font-bold p-2 rounded-sm cursor-pointer"
        >
          Add new note
        </button>

        <Modal isOpen={isModalOpen} onClose={CloseModal} />
      </div>
      <div className="grid md:grid-cols-3 gap-5 px-20 py-5 mt-4 ">
        <InfotNote />
      </div>
    </div>
  );
};

export default Home;
