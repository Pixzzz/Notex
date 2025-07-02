import NavBar from "../../Components/NavBar";
import InfotNote from "../../Components/InfotNote";
import Modal from "../../Components/Modals/Modal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"


import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState('');
  const Navigate = useNavigate();

  const fetchDataUser = async() => {
    const token = localStorage.getItem('Token');
    try {
      const response = await axios.get('http://localhost:3000/User/get-user',{
        headers: {Authorization: `Bearer ${token}`},
      })
      const data = response.data;
      setName(data.user.name)
      console.log(data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Check if the user is authenticated when the component mounts. If not, redirect to the login page
  useEffect(() => {
    fetchDataUser();
    // Check if the user is authenticated
    const token = localStorage.getItem("Token");
    if (!token) {
      Navigate("/");
    }
  }, []);

  const hadleLogOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    Navigate("/");
  };

  const OpenModal = () => setIsModalOpen(true);
  const CloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <NavBar
        Search={search}
        setSearch={setSearch}
        onLogOut={hadleLogOut}
        userName={name}
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={OpenModal}
          className="bg-green-800  text-white font-bold p-2 rounded-sm cursor-pointer hover:bg-green-700 transition duration-300 ease-in-out"
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
