import React from "react";
import "./MyOrders.css";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { token, url } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " X " + item.quantity;
                } else {
                  return item.name + " X " + item.quantity + ", ";
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items :{order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
              <button>Track Order</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
