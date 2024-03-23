import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function PizzaStages({ orders, setOrders }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMoveToNextStage = (orderId, currentStage) => {
    const updatedOrders = orders.map((order) =>
      order.OrderId === orderId
        ? {
            ...order,
            stage: currentStage,
            startTime: currentTime.getTime(),
          }
        : order
    );
    setOrders(updatedOrders);
  };

  function formatTime(seconds) {
    if (seconds < 0) {
      return "0 sec";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes === 0) {
      return `${remainingSeconds} sec`;
    }
    return `${minutes} min ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds} sec`;
  }

  const isTimeAboveThreshold = (order) => {
    const timeSpent = Math.floor(
      (currentTime - new Date(order.startTime)) / 1000
    );
    if (order.size === "Large") {
      return timeSpent > 300; // 5 minutes in seconds
    }
    if (order.size === "Medium") {
      return timeSpent > 240; // 4 minutes in seconds
    }
    return timeSpent > 180; // 3 minutes in seconds
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Pizza Stages Section
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          margin: "0 auto",
          width: "80vw",
        }}
      >
        <Box
          className="OrderPlaced"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Order Placed</Typography>
          {orders
            .filter((order) => order.stage === "Order Placed")
            .map((order) => (
              <Box
                key={order.OrderId}
                className={`OrderPlaced-Card cards ${
                  isTimeAboveThreshold(order) ? "time-warning" : ""
                }`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #000",
                  borderRadius: 4,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  margin: "6px 0",
                  padding: 5,
                  width: "60%",
                  bgcolor: isTimeAboveThreshold(order) ? "red" : "inherit",
                  color: isTimeAboveThreshold(order) ? "#fff" : "inherit",
                }}
              >
                <Typography variant="body1">Order 00{order.OrderId}</Typography>
                <Typography variant="body1">
                  {formatTime(
                    Math.floor((currentTime - new Date(order.startTime)) / 1000)
                  )}
                </Typography>
                <Button
                  onClick={() =>
                    handleMoveToNextStage(order.OrderId, "Order in Making")
                  }
                  type="button"
                >
                  Next
                </Button>
              </Box>
            ))}
        </Box>
        <Box
          className="OrderMaking"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Order in Making</Typography>
          {orders
            .filter((order) => order.stage === "Order in Making")
            .map((order) => (
              <Box
                key={order.OrderId}
                className={`OrderPlaced-Card cards ${
                  isTimeAboveThreshold(order) ? "time-warning" : ""
                }`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #000",
                  borderRadius: 4,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  margin: "6px 0",
                  padding: 5,
                  width: "60%",
                  bgcolor: isTimeAboveThreshold(order) ? "red" : "inherit",
                  color: isTimeAboveThreshold(order) ? "#fff" : "inherit",
                }}
              >
                <Typography variant="body1">Order 00{order.OrderId}</Typography>
                <Typography variant="body1">
                  {formatTime(
                    Math.floor((currentTime - new Date(order.startTime)) / 1000)
                  )}
                </Typography>
                <Button
                  onClick={() =>
                    handleMoveToNextStage(order.OrderId, "Order Ready")
                  }
                  type="button"
                >
                  Next
                </Button>
              </Box>
            ))}
        </Box>
        <Box
          className="OrderReady"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Order Ready</Typography>
          {orders
            .filter((order) => order.stage === "Order Ready")
            .map((order) => (
              <Box
                key={order.OrderId}
                className={`OrderPlaced-Card cards ${
                  isTimeAboveThreshold(order) ? "time-warning" : ""
                }`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #000",
                  borderRadius: 4,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  margin: "6px 0",
                  padding: 5,
                  width: "60%",
                  bgcolor: isTimeAboveThreshold(order) ? "red" : "inherit",
                  color: isTimeAboveThreshold(order) ? "#fff" : "inherit",
                }}
              >
                <Typography variant="body1">Order 00{order.OrderId}</Typography>
                <Typography variant="body1">
                  {formatTime(
                    Math.floor((currentTime - new Date(order.startTime)) / 1000)
                  )}
                </Typography>
                <Button
                  onClick={() =>
                    handleMoveToNextStage(order.OrderId, "Order Picked")
                  }
                  type="button"
                >
                  Next
                </Button>
              </Box>
            ))}
        </Box>
        <Box
          className="OrderPicked"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Order Picked</Typography>
          {orders
            .filter((order) => order.stage === "Order Picked")
            .map((order) => (
              <Box
                key={order.OrderId}
                className={`OrderPicked-Card cards`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #000",
                  borderRadius: 4,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  margin: "6px 0",
                  padding: 5,
                  width: "60%",
                }}
              >
                <Typography variant="body1">Order 00{order.OrderId}</Typography>
                <Typography variant="body1">Picked</Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
