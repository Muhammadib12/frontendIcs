import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

// ألوان عصرية أكثر تناسقاً
const COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#EC4899", // Pink
];

const RADIAN = Math.PI / 180;

// تحسين تصميم النسبة داخل الدائرة
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,

}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // إظهار النسبة فقط إذا كانت أكبر من 5%
  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      style={{
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PropertyDistributionChart() {
  const [data, setData] = useState<{ _id: string; count: number }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/api/admin/property-distribution");
      setData(res.data);
    };
    fetchData();
  }, []);

  // حساب المجموع الكلي
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

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
          right: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* العنوان المحدث */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
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
          התפלגות סוגי נכסים
        </h3>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.9rem",
            margin: "0.5rem 0 0 0",
            fontWeight: 400,
          }}
        >
          סה"כ {totalCount} נכסים במערכת
        </p>
      </div>

      {/* מעטפת הגרף */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          padding: "1rem",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <defs>
              {/* הגדרת gradient לכל צבע */}
              {COLORS.map((color, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`gradient-${index}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                </linearGradient>
              ))}
            </defs>

            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={hoveredIndex !== null ? 105 : 95}
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              strokeWidth={2}
              stroke="#fff"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index % COLORS.length})`}
                  style={{
                    filter:
                      hoveredIndex === index
                        ? "brightness(1.1)"
                        : "brightness(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "0.75rem",
                fontSize: "0.9rem",
                direction: "rtl",
                background: "rgba(17, 24, 39, 0.95)",
                color: "#fff",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                padding: "0.75rem 1rem",
              }}
              formatter={(value: number, name: string) => [
                <span style={{ fontWeight: 600, color: "#10B981" }}>
                  {value} נכסים
                </span>,
                <span style={{ fontWeight: 500 }}>{name}</span>,
              ]}
              labelStyle={{ display: "none" }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                paddingTop: "1rem",
                fontSize: "0.85rem",
              }}
              formatter={(value: string) => {
                const dataItem = data.find((item) => item._id === value);
                const percentage = dataItem
                  ? ((dataItem.count / totalCount) * 100).toFixed(1)
                  : "0";

                return (
                  <span
                    style={{
                      color: "#374151",
                      fontWeight: 500,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    {value}
                    <span
                      style={{
                        color: "#6B7280",
                        fontSize: "0.8rem",
                        fontWeight: 400,
                      }}
                    >
                      ({percentage}%)
                    </span>
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* מעטפת סטטיסטיקות נוספות */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.75rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {data.slice(0, 3).map((item, index) => (
          <div
            key={item._id}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0.5rem",
              padding: "0.5rem 0.75rem",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              {item._id}: {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyDistributionChart;
