import React, { useState, useEffect } from "react";

import { listOrders } from "../api/orders";
import OrdersTableItem from "./OrdersTableItem";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await listOrders(skip);
      setOrders([...orders, ...data]);
    };

    getOrders();
  }, [skip]);

  const loadMore = async () => {
    let toSkip = skip + 6;
    setSkip(toSkip);
  };

  return (
    <div className="order-section-container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Created</th>
            <th scope="col">Products</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <OrdersTableItem key={order._id} order={order} index={index} />
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mb-5" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default OrdersTable;
