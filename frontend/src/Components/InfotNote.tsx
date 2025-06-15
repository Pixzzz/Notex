import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalEdit from "../Components/Modals/ModalEdit";
import { useState, useEffect } from "react";
import { getRelativeTime } from "../utils/RelativeTime";

type Note = {
  _id: string;
  title: string;
  description: string;
  dateCreated: Date;
};

const InfotNote = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const FormateDate = new Date();
  // const DateString = FormateDate.toLocaleDateString();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const fetchData = async () => {
    const token = localStorage.getItem("Token");
    try {
      const res = await fetch("http://localhost:3000/information/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Note[] = await res.json();
      setNotes(data);
      console.log(data);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `http://localhost:3000/information/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      fetchData();
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {notes.map((note, index) => {
        return (
          <div
            key={index}
            className="p-10 bg-gray-100 rounded-lg hover:shadow-xl shadow-lg"
          >
            <h3 className="font-bold text-2xl text-green-800">{note.title}</h3>
            <p>{note.description}</p>
            <div className="flex justify-between items-end">
              <p className="font-semibold opacity-55 mt-2">
                {getRelativeTime(note.dateCreated)}
              </p>
              <div className="flex justify-end gap-5">
                <span className="cursor-pointer text-gray-400 hover:text-green-800">
                  <button
                    onClick={openModal}
                    className="cursor-pointer transition-all duration-300 transform hover:scale-110"
                  >
                    <EditIcon />
                  </button>
                  <ModalEdit
                    isOpen={isOpen}
                    onClose={closeModal}
                    noteId={note._id}
                  />
                </span>
                <span className="cursor-pointer text-gray-400 hover:text-red-700">
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="cursor-pointer transition-all duration-300 transform hover:scale-110"
                  >
                    <DeleteIcon />
                  </button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default InfotNote;
