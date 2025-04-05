import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  // Llamar al endpoint de prueba
  const fetchData = async () => {
    try {
      // Reemplaza "18.118.33.70" con la IP pública de tu EC2
      // const response = await fetch("http://18.118.33.70:3000/");
      const response = await fetch("http://localhost:3000/");

      const text = await response.text();
      setMessage(text);
    } catch (error) {
      setMessage("❌ Error al conectar con el servidor");
      console.error(error);
    }
  };

  // Llamar a la ruta de estudiantes
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/estudiantes");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Conexión a API en EC2</h1>
      <p>
        Respuesta del servidor: <strong>{message}</strong>
      </p>

      <h2>Estudiantes:</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.nombre} - {student.curso}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
