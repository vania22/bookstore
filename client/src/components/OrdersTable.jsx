import React from "react";

import OrdersTableItem from "./OrdersTableItem";

const OrdersTable = ({ orders }) => {
  console.log(orders);

  return (
    <div>
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
    </div>
  );
};

export default OrdersTable;
