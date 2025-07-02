import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(
        "http://localhost:3000/information/add",
        { title, description },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Barer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setTitle("");
        setDescription("");
        onClose();
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    handleSubmit;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div className="bg-white w-96 h-96 rounded-lg shadow-lg p-6 z-10">
        <h1 className="text-xl font-semibold">Add note</h1>

        <div className="flex flex-col gap-5 mt-5 ">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 p-2 text-3xl placeholder:text-3xl placeholder:font-semibold"
              type="text"
              placeholder="Titulo"
            />
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-25 p-2 bg-gray-100"
              placeholder="Descripcion"
              id=""
            ></textarea>
            <button className=" bg-gray-500 hover:bg-green-600 text-white px-4 py-2 rounded  cursor-pointer">
              Add note
            </button>
          </form>
          <button
            className=" bg-gray-500 hover:bg-red-600 text-white px-4 py-2 rounded  cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
