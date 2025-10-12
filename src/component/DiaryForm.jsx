import { useState } from "react";
import "./DiaryForm.css";

function DiaryForm({ onAddDiary }) {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = () => {
    onAddDiary(text); // 상위 Body로 전달
    setText(""); // 입력창 초기화
  };

  return (
    <section className="card">
      <h2 className="card-title">✏️ 오늘의 일기 작성</h2>
      <input
        type="text"
        placeholder="오늘 있었던 일을 기록하세요"
        value={text}
        onChange={handleChange}
        className="input"
      />
      <button onClick={handleSubmit} className="btn">
        저장하기
      </button>
    </section>
  );
}

export default DiaryForm;
