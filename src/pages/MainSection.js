import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function MainSection({ orders, setOrders }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds} sec`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    orders.forEach((order) => {
      if (order.stage === "Order Picked") {
        order.pausedTime = new Date();
      }
    });
  }, [orders]);

  const totalOrdersDelivered = orders.filter(
    (order) => order.stage === "Order Picked"
  ).length;

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "80vw",
        margin: "0 auto",
        textAlign: "left",
      }}
    >
      <h3>Main Section</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Total time spent (time from order placed)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.OrderId}>
                <TableCell>{`Order Id: 00${order.OrderId}`}</TableCell>
                <TableCell>{order.stage}</TableCell>
                <TableCell>
                  {order.stage !== "Order Picked"
                    ? formatTime(
                        Math.floor(
                          (currentTime - new Date(order.timeInStage)) / 1000
                        )
                      )
                    : formatTime(
                        Math.floor(
                          (order.pausedTime - new Date(order.timeInStage)) /
                            1000
                        )
                      )}
                </TableCell>
                <TableCell>
                  {order.stage !== "Order Ready" &&
                    order.stage !== "Order Picked" && (
                      <Button
                        onClick={() =>
                          setOrders(
                            orders.filter((o) => o.OrderId !== order.OrderId)
                          )
                        }
                      >
                        Cancel
                      </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="totalOrdersDelivered">
              <TableCell>Total order delivered</TableCell>
              <TableCell colSpan={3}>{`00${totalOrdersDelivered}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
