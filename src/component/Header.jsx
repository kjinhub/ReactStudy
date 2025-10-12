import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  // const date = new Date().toLocaleDateString();
  return (
    <header className="header">
      <h1 className="title">나의 하루 일기</h1>
      <p className="time">{time}</p>
    </header>
  );
}
export default Header;
