import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../utils/axios";
import ShimmerLoading from "./ShimmerLoading";

type UserGrowthData = {
  name: string;
  users: number;
};

const UserGrowthChart = () => {
  const [data, setData] = useState<UserGrowthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/api/admin/user-growth");
        setData(res.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <ShimmerLoading type="chart" />
        <ShimmerLoading type="chart" />
      </>
    );
  }

  // حساب إجمالي المستخدمين
  const totalUsers = data.reduce(
    (sum: number, item: any) => sum + (item.users || 0),
    0
  );
  const latestGrowth =
    data.length > 1
      ? data[data.length - 1]?.users - data[data.length - 2]?.users
      : 0;

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "1.5rem",
        padding: "1.5rem",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        direction: "rtl",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* تأثير ديكوري في الخلفية */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "25px 25px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* العنوان والإحصائيات */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h3
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              fontWeight: 700,
              margin: 0,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.5px",
            }}
          >
            התפתחות משתמשים
          </h3>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.9rem",
              margin: "0.5rem 0 0 0",
              fontWeight: 400,
            }}
          >
            מעקב אחר צמיחת הקהילה שלנו
          </p>
        </div>

        {/* סטטיסטיקות מהירות */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              textAlign: "center",
              minWidth: "80px",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              {totalUsers.toLocaleString()}
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              סה"כ משתמשים
            </div>
          </div>

          {latestGrowth !== 0 && (
            <div
              style={{
                background:
                  latestGrowth > 0
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(239, 68, 68, 0.2)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                backdropFilter: "blur(10px)",
                border: `1px solid ${
                  latestGrowth > 0
                    ? "rgba(16, 185, 129, 0.3)"
                    : "rgba(239, 68, 68, 0.3)"
                }`,
                textAlign: "center",
                minWidth: "80px",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "0.25rem",
                }}
              >
                {latestGrowth > 0 ? "+" : ""}
                {latestGrowth}
              </div>
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                שינוי אחרון
              </div>
            </div>
          )}
        </div>
      </div>

      {/* מעטפת הגרף */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          padding: "1.5rem",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 1,
          height: "calc(100% - 120px)",
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ color: "#666", fontSize: "0.9rem" }}>טוען נתונים...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                {/* גרדיאנט עשיר יותר */}
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#764ba2" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#667eea" stopOpacity={0.1} />
                </linearGradient>

                {/* גרדיאנט לקו */}
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#667eea" />
                </linearGradient>

                {/* צל לגרף */}
                <filter
                  id="dropshadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="3"
                    floodColor="#667eea"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(102, 126, 234, 0.2)"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                  fontWeight: 500,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                  fontWeight: 500,
                }}
                dx={-10}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  fontSize: "0.9rem",
                  direction: "rtl",
                  background: "rgba(17, 24, 39, 0.95)",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(10px)",
                  padding: "0.75rem 1rem",
                }}
                formatter={(value: number, name: string) => [
                  <span style={{ fontWeight: 600, color: "#667eea" }}>
                    {value.toLocaleString()} משתמשים
                  </span>,
                  "מספר משתמשים",
                ]}
                labelStyle={{
                  color: "#fff",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                }}
              />

              <Area
                type="monotone"
                dataKey="users"
                stroke="url(#strokeGradient)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUsers)"
                filter="url(#dropshadow)"
                dot={{
                  fill: "#667eea",
                  strokeWidth: 3,
                  stroke: "#fff",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  fill: "#667eea",
                  strokeWidth: 3,
                  stroke: "#fff",
                  style: {
                    filter: "drop-shadow(0 0 6px rgba(102, 126, 234, 0.6))",
                  },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* CSS Animation for loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default UserGrowthChart;
