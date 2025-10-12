import { useState } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import "./Body.css";

function Body() {
  const [diaries, setDiaries] = useState([
    { id: 1, content: "today i studied react so hard", emotion: "^_^" },
    { id: 2, content: "today i workout calisthenic so hard", emotion: "m_m" },
  ]);

  const addDiary = (text) => {
    if (!text.trim()) return;
    const newDiary = { id: Date.now(), content: text, emotion: "🩵" };
    setDiaries([newDiary, ...diaries]); // 새 배열로 교체 (리렌더 발생)
  };

  return (
    <main className="body">
      <DiaryForm onAddDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </main>
  );
}

export default Body;
