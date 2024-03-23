import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const PizzaOrderForm = ({ orders, setOrders }) => {
  const [orderId, setOrderId] = useState(2);
  const [pizzaType, setPizzaType] = useState("Veg");
  const [pizzaSize, setPizzaSize] = useState("Large");
  const [pizzaBase, setPizzaBase] = useState("Thin");

  const handleTypeChange = (event) => {
    setPizzaType(event.target.value);
  };

  const handleSizeChange = (event) => {
    setPizzaSize(event.target.value);
  };

  const handleBaseChange = (event) => {
    setPizzaBase(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const totalPlacedOrders = orders.filter(
      (order) => order.stage !== "Order Picked"
    ).length;

    if (totalPlacedOrders > 9) {
      alert("Not taking any order for now. Please try again later.");
      return;
    }

    const currentTime = new Date();
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        OrderId: orderId,
        type: pizzaType,
        size: pizzaSize,
        base: pizzaBase,
        stage: "Order Placed",
        timeInStage: currentTime.getTime(),
        startTime: currentTime.getTime(),
        pausedTime: currentTime.getTime(),
      },
    ]);
    setOrderId((prevOrderId) => prevOrderId + 1);
  };

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h5">Pizza Order Form</Typography>
    </Grid>
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel size="small">Pizza Type</InputLabel>
              <Select
                size="small"
                value={pizzaType}
                onChange={handleTypeChange}
              >
                <MenuItem value="Veg">Veg</MenuItem>
                <MenuItem value="Non-Veg">Non-Veg</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel size="small">Pizza Size</InputLabel>
              <Select
                size="small"
                value={pizzaSize}
                onChange={handleSizeChange}
              >
                <MenuItem value="Large">Large</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Small">Small</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel size="small">Pizza Base</InputLabel>
              <Select
                size="small"
                value={pizzaBase}
                onChange={handleBaseChange}
              >
                <MenuItem value="Thin">Thin</MenuItem>
                <MenuItem value="Thick">Thick</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth type="submit" variant="contained">
              Place Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  </Grid>
  
  );
};

export default PizzaOrderForm;
