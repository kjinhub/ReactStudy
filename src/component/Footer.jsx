import { useRef } from "react";
import "./Footer.css";

function Footer() {
  const inputRef = useRef();
  const focusInput = () => {
    inputRef.current.focus();
  };
  return (
    <footer className="footer" style={{ marginTop: 30 }}>
      <input ref={inputRef} placeholder="focus test" className="footer-input" />
      <button onClick={focusInput} className="footer-btn">
        focus input
      </button>
    </footer>
  );
}
export default Footer;
