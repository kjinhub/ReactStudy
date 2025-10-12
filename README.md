React Diary App
📘 프로젝트 개요

이 프로젝트는 React 기본 기능(컴포넌트, JSX, Props, 이벤트, State, Ref, Hooks) 을 실습하기 위해 만든 미니 앱입니다.
사용자는 일기를 작성하고, 저장 버튼을 누르면 화면에 새로운 일기가 추가됩니다.
전체 디자인은 Toss 감성의 심플한 UI로 구성되었습니다.

🧱 기술 스택
분류	사용 기술
Frontend Framework	React 18 (Vite 기반)
Language	JavaScript (ES6+)
CSS 스타일링	CSS Modules (파일 분리)
Hooks	useState, useEffect, useRef
Build Tool	Vite
Runtime	Node.js (npm)
📂 폴더 구조
src/
 ├─ components/
 │   ├─ Header.jsx
 │   ├─ Body.jsx
 │   ├─ DiaryForm.jsx
 │   ├─ DiaryList.jsx
 │   └─ Footer.jsx
 ├─ App.jsx
 ├─ App.css
 ├─ index.css
 └─ main.jsx

⚙️ 설치 및 실행 방법
1. Node.js 확인
node -v
npm -v

2. Vite로 리액트 앱 생성
npm create vite@latest . -- --template react

3. 의존성 설치
npm install

4. 개발 서버 실행
npm run dev


기본 접속 주소:
👉 http://localhost:5173

🪄 주요 기능 요약
기능	설명
🧩 컴포넌트 분리	Header, Body, Footer, DiaryForm, DiaryList 로 UI 구성
💬 Props 전달	부모(Body) → 자식(DiaryList, DiaryForm)
🧠 State 관리	useState 로 일기 목록 상태 저장
🎯 이벤트 처리	onClick, onChange 로 사용자 입력 관리
🔁 리렌더링	setDiaries([...]) 호출 시 자동 리렌더
👁 Ref 사용	Footer에서 input focus 제어
⏱ Hooks 사용	Header에서 useEffect 로 실시간 시계 구현
🎨 Toss 스타일 디자인	흰색 배경, 파란 포인트, 둥근 카드형 UI
💡 주요 코드 예시
📄 Body.jsx
const [diaries, setDiaries] = useState([
  { id: 1, content: "today i studied react so hard", emotion: "^_^" },
]);

const addDiary = (text) => {
  const newDiary = { id: Date.now(), content: text, emotion: "🩵" };
  setDiaries([newDiary, ...diaries]);
};

📄 DiaryForm.jsx
function DiaryForm({ onAddDiary }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAddDiary(text);
    setText("");
  };

  return (
    <section className="card">
      <input
        type="text"
        placeholder="오늘 있었던 일을 기록하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input"
      />
      <button onClick={handleSubmit} className="btn">저장하기</button>
    </section>
  );
}

🎨 UI 미리보기
화면	설명
🩵 Header	Toss 파란색 타이틀 + 실시간 시계
✏️ DiaryForm	둥근 입력창 + 저장 버튼
📖 DiaryList	카드형 일기 목록, 감정 이모지 포함
💬 Footer	ref로 포커스 제어 가능한 입력창
🧩 학습 포인트

JSX 문법 규칙 (닫힘, 최상위 태그, 표현식)

Props 구조분해와 children 개념

이벤트 핸들링 vs HTML 차이점

useState, useRef, useEffect 실습

React의 불변성 원칙 (setState 시 새 배열 생성)

컴포넌트 기반 UI 재사용성
