import React, { useEffect, useState } from "react";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  noteId: number;
}

const ModalEdit: React.FC<ModalEditProps> = ({ isOpen, onClose, noteId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/information/update/${noteId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      if (response.ok) {
        onClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/information/${noteId}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isOpen, noteId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div className="bg-white w-96 h-96 rounded-lg p-6 z-10">
        <h1 className="text-xl font-semibold text-black">Edit note</h1>

        <div className="flex flex-col gap-5 mt-5 ">
          <form
            action=""
            onSubmit={handleEditSubmit}
            className="flex flex-col gap-4"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 p-2 text-3xl text-gray-800 placeholder:text-3xl placeholder:font-semibold"
              type="text"
              placeholder="Titulo"
            />
            <textarea
              name=""
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="h-25 p-2 bg-gray-100 text-gray-800"
              placeholder="Descripcion"
              id=""
            ></textarea>
            <button className=" bg-gray-500 hover:bg-green-600 text-white px-4 py-2 rounded  cursor-pointer">
              Edit note
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

export default ModalEdit;
