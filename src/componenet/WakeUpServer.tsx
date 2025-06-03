import { useEffect, useState } from "react";
import axios from "axios";

function WakeUpServer() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const pingServer = async () => {
      try {
        setStatus("⏳ קןרא לשרת  ...");
        await axios.get("https://backendics.onrender.com/api/keep-alive"); // غيّر هذا للرابط الفعلي
        setStatus("✅ الخادم جاهز!");
      } catch (e) {
        setStatus("⚠️ تعذر الوصول إلى الخادم.");
      } finally {
        setLoading(false);
      }
    };

    pingServer();
  }, []);

  if (!loading) return null;

  return (
    <div style={{ padding: "40px", textAlign: "center", fontSize: "1.2rem" }}>
      <p>{status}</p>
      <div className="loader" />
    </div>
  );
}

export default WakeUpServer;
