import React, { useState, useEffect } from "react";
import moment from "moment";

import { updateOrderStatus } from "../api/orders";

const OrdersTableItem = ({ order, index }) => {
  const [status, setStatus] = useState("");

  const updateStatus = (e) => {
    setStatus(e.target.value);
    updateOrderStatus(order._id, e.target.value);
  };

  useEffect(() => {
    setStatus(order.status);
  }, []);

  return (
    <tr>
      <th scope="row">{index}</th>
      <th>{moment(order.createdAt).format("DD MM YYYY hh:mm:ss")}</th>
      <th>
        {order.products.map((product, index) => (
          <div key={index}>
            {product.name} | {product.count} pc(s)
          </div>
        ))}
      </th>
      <th>${order.amount}</th>
      <th>
        <select value={status} onChange={(e) => updateStatus(e)}>
          <option value="Not Processed">Not Processed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </th>
    </tr>
  );
};

export default OrdersTableItem;
