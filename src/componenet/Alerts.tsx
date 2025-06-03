import React, { useEffect, useState } from "react";
import styles from "./../styles/Alerts.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import {
  AlertTriangle,
  MessageCircle,
  Send,
  X,
  Shield,
  HelpCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

function Alerts() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const [supportMessages, setSupportMessages] = useState<any[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    setStatus("sending");
    try {
      await axiosInstance.post("/api/support/message", {
        message,
        userId: user?.id,
        username: user?.username,
      });
      setStatus("sent");
      setMessage("");
      setTimeout(() => {
        setShowModal(false);
        setStatus("idle");
      }, 2000);
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "sent") {
      toast.success("ההודעה נשלחה בהצלחה!");
    }
    if (status === "error") {
      toast.error("שגיאה בשליחת ההודעה, אנא נסה שוב מאוחר יותר");
    }
  }, [status]);

  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const res = await axiosInstance.get("/api/support/messages");
        setSupportMessages(res.data);
      } catch (err) {}
    };

    if (user?.username === "admin1") {
      fetchSupportMessages();
    }
  }, [user]);

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const res = await axiosInstance.delete(
        `/api/support/messages/${messageId}`
      );

      setSupportMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      toast.success(res?.data?.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "שגיאה במחיקת ההודעה");
    }
  };

  const openModal = () => {
    setShowModal(true);
    setMessage("");
    setStatus("idle");
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage("");
    setStatus("idle");
  };

  return (
    <div className={styles.alerts}>
      <div className={styles.alertsContainer}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <AlertTriangle size={28} />
          </div>
          <h2 className={styles.title}>התראות מערכת</h2>
        </div>

        {/* Admin Support Messages Section */}
        {user?.username === "admin1" && (
          <div className={styles.adminSection}>
            <div className={styles.adminHeader}>
              <div className={styles.adminIcon}>
                <MessageCircle size={24} />
              </div>
              <h3 className={styles.adminTitle}>הודעות תמיכה מהמשתמשים</h3>
              <div className={styles.messageCount}>
                {supportMessages.length} הודעות
              </div>
            </div>

            <div className={styles.messagesContainer}>
              {supportMessages.length === 0 ? (
                <div className={styles.noMessages}>
                  <MessageCircle size={48} className={styles.noMessagesIcon} />
                  <h4>אין הודעות כרגע</h4>
                  <p>כל הודעות התמיכה מהמשתמשים יופיעו כאן</p>
                </div>
              ) : (
                <div className={styles.messagesList}>
                  {supportMessages.map((msg, index) => (
                    <div key={msg._id} className={styles.messageCard}>
                      <div className={styles.messageHeader}>
                        <div className={styles.userInfo}>
                          <div className={styles.userAvatar}>
                            {msg.fromUsername?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div className={styles.userDetails}>
                            <h4 className={styles.userName}>
                              {msg.fromUsername}
                            </h4>
                            <span className={styles.messageTime}>
                              {new Date(msg.createdAt).toLocaleString("he-IL", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                        <div className={styles.messageActions}>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteMessage(msg._id)}
                          >
                            <X size={16} />
                            מחק
                          </button>
                        </div>
                      </div>

                      <div className={styles.messageContent}>
                        <p className={styles.messageText}>{msg.message}</p>
                      </div>

                      <div className={styles.messageFooter}>
                        <span className={styles.messageStatus}>חדש</span>
                        <span className={styles.messageId}>#{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {user?.status === "blocked" ? (
          <div className={styles.blockedCard}>
            <div className={styles.cardHeader}>
              <div className={styles.warningIcon}>
                <Shield size={32} />
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.blockedTitle}>החשבון שלך נחסם זמנית</h3>
                <div className={styles.statusBadge}>
                  <Clock size={14} />
                  חסימה זמנית
                </div>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.restriction}>
                <p className={styles.blockedReason}>
                  🚫 לא תוכל לפרסם מודעות או להעלות נכסים בזמן זה
                </p>
                <p className={styles.blockedHelp}>
                  💬 אם אתה סבור שזה קרה בטעות, אנא צור קשר עם צוות התמיכה
                </p>
              </div>

              <button className={styles.supportButton} onClick={openModal}>
                <MessageCircle size={20} />
                פנה לתמיכה
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.noAlertsCard}>
            <div className={styles.noAlertsIcon}>
              <CheckCircle size={48} />
            </div>
            <h3>הכל בסדר!</h3>
            <p>אין התראות חדשות כרגע</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <HelpCircle size={24} />
              </div>
              <h3 className={styles.modalTitle}>פנייה לתמיכה</h3>
              <button className={styles.closeButton} onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <p className={styles.modalDescription}>
                אנא תאר את הבעיה שלך בפירוט. צוות התמיכה שלנו יחזור אליך בהקדם
                האפשרי.
              </p>

              <div className={styles.messageBox}>
                <label className={styles.messageLabel}>הודעתך:</label>
                <textarea
                  className={styles.messageTextarea}
                  placeholder="כתוב את הודעתך כאן... נסה לתת כמה שיותר פרטים על הבעיה"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
                <div className={styles.charCounter}>
                  {message.length}/500 תווים
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={closeModal}
                disabled={status === "sending"}
              >
                ביטול
              </button>
              <button
                className={`${styles.sendButton} ${
                  status === "sent" ? styles.sentButton : ""
                }`}
                onClick={handleSend}
                disabled={status === "sending" || !message.trim()}
              >
                {status === "sending" && <div className={styles.spinner} />}
                {status === "sent" && <CheckCircle size={18} />}
                {status === "idle" && <Send size={18} />}
                {status === "error" && <Send size={18} />}

                {status === "sending" && "שולח..."}
                {status === "sent" && "נשלח!"}
                {(status === "idle" || status === "error") && "שלח הודעה"}
              </button>
            </div>

            {status === "sent" && (
              <div className={styles.successMessage}>
                <CheckCircle size={20} />
                ההודעה נשלחה בהצלחה! נחזור אליך בקרוב.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;
