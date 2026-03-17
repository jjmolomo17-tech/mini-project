import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes", {
      withCredentials: true
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    await axios.post("http://localhost:5000/api/notes",
      { content },
      { withCredentials: true }
    );
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <input onChange={e => setContent(e.target.value)} />
      <button onClick={addNote}>Add</button>

      {notes.map(n => (
        <div key={n.id}>{n.content}</div>
      ))}
    </div>
  );
}