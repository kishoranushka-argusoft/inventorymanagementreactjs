import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/transactions/"
        );
        console.log("*******************", response.data);
        setSeller(response.data);
        console.log(seller);
      } catch (error) {
        console.error("Error fetching products ", error);
      }
    };
    fetchSeller();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-600 mb-6">
        All the available Categories
      </h2>

      <table class="border-separate border border-gray-400 text-center">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 ">Transactions Type</th>
            <th className="border border-gray-300 px-4">Product</th>
            <th className="border border-gray-300 px-4">Price Per Unit</th>
            <th className="border border-gray-300 px-4">Quantity</th>
            <th className="border border-gray-300 px-4">Total Price</th>
            <th className="border border-gray-300 px-4">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {seller.map((item, idx) => (
            <tr>
              <td className="border border-gray-300 px-4">{idx + 1}</td>
              <td className="border border-gray-300 px-4">
                {item.transactions_type}
              </td>
              <td className="border border-gray-300 px-4">{item.product}</td>
              <td className="border border-gray-300 px-4">{item.price_per_unit}</td>
              <td className="border border-gray-300 px-4">{item.quantity}</td>
              <td className="border border-gray-300 px-4">
                {item.total_price}
              </td>
              <td className="border border-gray-300 px-4">
                {item.transaction_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
