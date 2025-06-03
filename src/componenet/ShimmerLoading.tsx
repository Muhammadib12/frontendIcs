import React from "react";

interface ShimmerProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

// المكون الأساسي للشيمر
const Shimmer: React.FC<ShimmerProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
};

// شيمر للكارد الواحد
interface CardShimmerProps {
  showAvatar?: boolean;
  showActions?: boolean;
  linesCount?: number;
}

const CardShimmer: React.FC<CardShimmerProps> = ({
  showAvatar = true,
  showActions = true,
  linesCount = 2,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Status indicator shimmer */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
      >
        <Shimmer width="12px" height="12px" borderRadius="50%" />
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {/* Avatar shimmer */}
        {showAvatar && (
          <Shimmer width="60px" height="60px" borderRadius="1rem" />
        )}

        {/* Content shimmer */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "0.5rem",
            }}
          >
            {/* Title shimmer */}
            <Shimmer width="60%" height="24px" borderRadius="6px" />

            {/* Actions button shimmer */}
            {showActions && (
              <Shimmer width="24px" height="24px" borderRadius="6px" />
            )}
          </div>

          {/* Description lines shimmer */}
          {Array.from({ length: linesCount }).map((_, index) => (
            <div key={index} style={{ marginBottom: "0.75rem" }}>
              <Shimmer
                width={index === linesCount - 1 ? "40%" : "80%"}
                height="16px"
                borderRadius="4px"
              />
            </div>
          ))}

          {/* Badge shimmer */}
          <Shimmer width="80px" height="24px" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
};

// شيمر للجدول
interface TableShimmerProps {
  rows?: number;
  columns?: number;
}

const TableShimmer: React.FC<TableShimmerProps> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Table header shimmer */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #E5E7EB",
          marginBottom: "1rem",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Shimmer key={index} width="70%" height="20px" borderRadius="4px" />
        ))}
      </div>

      {/* Table rows shimmer */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "1rem",
            paddingBottom: "1rem",
            marginBottom: "1rem",
            borderBottom: rowIndex < rows - 1 ? "1px solid #F3F4F6" : "none",
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Shimmer
              key={colIndex}
              width={colIndex === 0 ? "90%" : "60%"}
              height="18px"
              borderRadius="4px"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// شيمر للقوائم
interface ListShimmerProps {
  items?: number;
  showIcon?: boolean;
}

const ListShimmer: React.FC<ListShimmerProps> = ({
  items = 6,
  showIcon = true,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "1rem",
            marginBottom: "1rem",
            borderBottom: index < items - 1 ? "1px solid #F3F4F6" : "none",
          }}
        >
          {showIcon && (
            <Shimmer width="40px" height="40px" borderRadius="50%" />
          )}
          <div style={{ flex: 1 }}>
            <Shimmer width="70%" height="18px" borderRadius="4px" />
            <div style={{ marginTop: "0.5rem" }}>
              <Shimmer width="50%" height="14px" borderRadius="4px" />
            </div>
          </div>
          <Shimmer width="60px" height="32px" borderRadius="6px" />
        </div>
      ))}
    </div>
  );
};

// المكون الرئيسي مع أنواع مختلفة من الشيمر
interface ShimmerLoadingProps {
  type?: "cards" | "table" | "list" | "profile" | "chart";
  count?: number;
  variant?: "default" | "compact" | "detailed";
}

const ShimmerLoading: React.FC<ShimmerLoadingProps> = ({
  type = "cards",
  count = 6,
  variant = "default",
}) => {
  const renderShimmer = () => {
    switch (type) {
      case "cards":
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {Array.from({ length: count }).map((_, index) => (
              <CardShimmer
                key={index}
                linesCount={
                  variant === "detailed" ? 3 : variant === "compact" ? 1 : 2
                }
              />
            ))}
          </div>
        );

      case "table":
        return (
          <TableShimmer
            rows={count}
            columns={variant === "detailed" ? 6 : variant === "compact" ? 3 : 4}
          />
        );

      case "list":
        return <ListShimmer items={count} showIcon={variant !== "compact"} />;

      case "profile":
        return (
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "2rem",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Profile header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Shimmer width="120px" height="120px" borderRadius="50%" />
              <div style={{ flex: 1 }}>
                <Shimmer width="200px" height="32px" borderRadius="6px" />
                <div style={{ margin: "1rem 0" }}>
                  <Shimmer width="300px" height="18px" borderRadius="4px" />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Shimmer width="100px" height="36px" borderRadius="6px" />
                  <Shimmer width="100px" height="36px" borderRadius="6px" />
                </div>
              </div>
            </div>

            {/* Profile details */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ marginBottom: "1.5rem" }}>
                <Shimmer width="120px" height="20px" borderRadius="4px" />
                <div style={{ marginTop: "0.5rem" }}>
                  <Shimmer width="80%" height="16px" borderRadius="4px" />
                </div>
              </div>
            ))}
          </div>
        );

      case "chart":
        return (
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "2rem",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              height: "400px",
            }}
          >
            {/* Chart header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <Shimmer width="200px" height="28px" borderRadius="6px" />
              <Shimmer width="100px" height="32px" borderRadius="6px" />
            </div>

            {/* Chart content */}
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-around",
                height: "250px",
                gap: "1rem",
              }}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <Shimmer
                  key={index}
                  width="40px"
                  height={`${Math.random() * 80 + 20}%`}
                  borderRadius="4px"
                />
              ))}
            </div>

            {/* Chart legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginTop: "1rem",
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Shimmer width="12px" height="12px" borderRadius="50%" />
                  <Shimmer width="60px" height="16px" borderRadius="4px" />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {renderShimmer()}

      {/* CSS Animation */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShimmerLoading;
export { CardShimmer, TableShimmer, ListShimmer, Shimmer };
