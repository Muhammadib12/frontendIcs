import  { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import {
  Search,
  Trash2,
 
  Ban,
  Users,
  MoreVertical,

  UserPlus,
  Unlock,
} from "lucide-react";
import ShimmerLoading from "./../componenet/ShimmerLoading";
import styles from "./../styles/UserManagment.module.css";
import { toast } from "react-toastify";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  lastLogin?: string;
  status?: "active" | "blocked" | "pending";
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilterRole('all');
        setLoading(true);
        const response = await axiosInstance.get("/api/admin/users");
        setUsers(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  //   not used yet dont have a role in user model
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAction = async (
    action: string,
    userId: string,
    username: string
  ) => {
    setActiveDropdown(null);

    if (action === "delete") {
      try {
        setDeletingUserId(userId); // Start loading for this card
        await axiosInstance.delete(`/api/admin/users/${userId}`);
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        toast.success(`המשתמש ${username} נמחק בהצלחה`);
      } catch (err) {
        toast.error(`שגיאה במחיקת המשתמש ${username}`);
      } finally {
        setDeletingUserId(null); // Reset loading
      }
    } else if (action === "block" || action === "unblock") {
      const newStatus = action === "block" ? "blocked" : "active";
      try {
        await axiosInstance.patch(`/api/admin/users/block/${userId}`, {
          status: newStatus,
        });

        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: newStatus } : u))
        );

        toast.success(
          `המשתמש ${username} ${
            newStatus === "blocked" ? "נחסם" : "הוסר החסימה"
          } בהצלחה`
        );
      } catch (err) {
        toast.error(
          `שגיאה ב${
            newStatus === "blocked" ? "חסימה" : "הסרת חסימה"
          } של המשתמש ${username}`
        );
      }
    }
  };

  // not used yet
  const getRoleClass = (role: string) => {
    switch (role) {
      case "admin":
        return styles.roleAdmin;
      case "moderator":
        return styles.roleModerator;
      case "user":
        return styles.roleUser;
      default:
        return styles.roleDefault;
    }
  };

  const getStatusClass = (status: string = "active") => {
    switch (status) {
      case "active":
        return styles.statusActive;
      case "blocked":
        return styles.statusBlocked;
      case "pending":
        return styles.statusPending;
      default:
        return styles.statusDefault;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.shimmerContainer}>
          <ShimmerLoading type="cards" count={6} variant="default" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <Users size={24} />
            </div>
            <div className={styles.titleInfo}>
              <h1 className={styles.title}>ניהול משתמשים</h1>
              <p className={styles.subtitle}>{users.length} משתמשים במערכת</p>
            </div>
          </div>

          <button className={styles.addUserButton}>
            <UserPlus size={18} />
            הוסף משתמש
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className={styles.searchFilterBar}>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="חפש לפי שם או אימייל..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className={styles.usersSection}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>טוען משתמשים...</p>
          </div>
        ) : (
          <div className={styles.usersGrid}>
            {filteredUsers
              .filter((user) => user.username !== "admin1") // Skip admin users
              .map((user) => (
                <div key={user._id} className={styles.userCard}>
                  {/* Loading Overlay for Delete */}
                  {deletingUserId === user._id && (
                    <div className={styles.cardLoadingOverlay}>
                      <div className={styles.cardLoadingContent}>
                        <div className={styles.cardLoadingSpinner} />
                        <p className={styles.cardLoadingText}>מוחק משתמש...</p>
                      </div>
                    </div>
                  )}

                  {/* Status Indicator */}
                  <div
                    className={`${styles.statusIndicator} ${getStatusClass(
                      user.status
                    )}`}
                  />

                  <div className={styles.userCardContent}>
                    {/* Avatar */}
                    <div
                      className={`${styles.avatar} ${getRoleClass(user.role)}`}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>

                    {/* User Info */}
                    <div className={styles.userInfo}>
                      <div className={styles.userHeader}>
                        <h3 className={styles.username}>{user.username}</h3>

                        {/* Actions Dropdown */}
                        <div className={styles.dropdownWrapper}>
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === user._id ? null : user._id
                              )
                            }
                            className={styles.dropdownToggle}
                            disabled={deletingUserId === user._id}
                          >
                            <MoreVertical size={18} />
                          </button>

                          {activeDropdown === user._id &&
                            deletingUserId !== user._id && (
                              <div className={styles.dropdownMenu}>
                                {user.status !== "blocked" && (
                                  <button
                                    onClick={() =>
                                      handleAction(
                                        "block",
                                        user._id,
                                        user.username
                                      )
                                    }
                                    className={`${styles.dropdownItem} ${styles.blockItem}`}
                                  >
                                    <Ban
                                      size={16}
                                      className={styles.blockIcon}
                                    />
                                    חסום משתמש
                                  </button>
                                )}
                                {user.status === "blocked" && (
                                  <button
                                    onClick={() =>
                                      handleAction(
                                        "unblock",
                                        user._id,
                                        user.username
                                      )
                                    }
                                    className={`${styles.dropdownItem} ${styles.blockItem}`}
                                  >
                                    <Unlock
                                      size={16}
                                      className={styles.blockIcon}
                                    />
                                    הסר חסימה
                                  </button>
                                )}

                                <button
                                  onClick={() =>
                                    handleAction(
                                      "delete",
                                      user._id,
                                      user.username
                                    )
                                  }
                                  className={`${styles.dropdownItem} ${styles.deleteItem}`}
                                >
                                  <Trash2
                                    size={16}
                                    className={styles.deleteIcon}
                                  />
                                  מחק משתמש
                                </button>
                              </div>
                            )}
                        </div>
                      </div>

                      <p className={styles.userEmail}>{user.email}</p>

                      {/* Role Badge */}
                      <div
                        className={`${
                          user.status === "blocked"
                            ? styles.roleBadge1
                            : styles.roleBadge
                        }`}
                      >
                        {user.status === "blocked" ? "חסום" : "פעיל"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {filteredUsers.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <Users size={48} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>לא נמצאו משתמשים</h3>
            <p className={styles.emptySubtitle}>
              נסה לשנות את מילות החיפוש או הסינון
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
