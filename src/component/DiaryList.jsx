import "./DiaryList.css";

function DiaryList({ diaries }) {
  return (
    <section className="card">
      <h2 className="card-title">📖 일기 목록</h2>
      {diaries.map((d) => (
        <div key={d.id} className="item">
          <span className="emotion">{d.emotion}</span>
          <p className="content">{d.content}</p>
        </div>
      ))}
    </section>
  );
}

export default DiaryList;
