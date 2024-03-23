import { useState } from "react";
import { Box } from "@mui/material";
import PizzaOrderForm from "./pages/PizzaOrderForm";
import PizzaStages from "./pages/PizzaStages";
import MainSection from "./pages/MainSection";


export default function App() {
  const [orders, setOrders] = useState([
    {
      OrderId: 1,
      type: "Veg",
      size: "Large",
      base: "Thin",
      stage: "Order Placed",
      timeInStage: new Date().getTime(),
      startTime: new Date().getTime(),
      pausedTime: new Date().getTime(),
    },
  ]);

  return (
    <Box sx={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <PizzaOrderForm orders={orders} setOrders={setOrders} />
      <PizzaStages orders={orders} setOrders={setOrders} />
      <MainSection orders={orders} setOrders={setOrders} />
    </Box>
  );
}
