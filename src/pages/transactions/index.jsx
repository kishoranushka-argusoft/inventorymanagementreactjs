import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Categories = () => {
  const [transaction, settransaction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchtransaction = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/transactions/"
        );
        console.log("*******************", response.data);
        settransaction(response.data);
        console.log(transaction);
      } catch (error) {
        console.error("Error fetching products ", error);
      }
    };
    fetchtransaction();
  }, []);


   const handleEdit = async (transactionItem) => {
     console.log("transactionItemmmmmmm", transactionItem);
     navigate("/edittransaction", { state: { transactionItem } });
   };

   const handleDelete = async (transactionId) => {
     console.log("222222222", transactionId);
     try {
       const getDeleteTransactionRes = await axios.delete(
         `http://127.0.0.1:8000/api/v1/transaction/${transactionId}`
       );
       console.log("transaction deleted successfully!", getDeleteTransactionRes);
       settransaction((prev) => prev.filter((transaction) => transaction.id !== transactionId));
       toast.success("transaction deleted successfully!");
       console.log(transactionId);
     } catch (error) {
       console.log("error deleting transaction", error);
     }
   };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-600 ">
          All the available transactions
        </h2>
        <div className="flex gap-6">
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/">Dashboard</Link>
          </button>
          <button className="p-2 px-6 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/addtransaction">Add</Link>
          </button>
        </div>
      </div>

      <table class="border-separate border border-gray-400 text-center w-full">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 ">Transactions Type</th>
            <th className="border border-gray-300 px-4">Product</th>
            <th className="border border-gray-300 px-4">Price Per Unit</th>
            <th className="border border-gray-300 px-4">Quantity</th>
            <th className="border border-gray-300 px-4">Total Price</th>
            <th className="border border-gray-300 px-4">Transaction Date</th>
            <th className="border border-gray-300 px-4">Edit</th>
            <th className="border border-gray-300 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((item, idx) => (
            <tr className="">
              <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
              <td className="border border-gray-300 px-4">
                {item.transactions_type}
              </td>
              <td className="border border-gray-300 px-4">
                {item.product_name}
              </td>
              <td className="border border-gray-300 px-4">
                {item.price_per_unit}
              </td>
              <td className="border border-gray-300 px-4">{item.quantity}</td>
              <td className="border border-gray-300 px-4">
                {item.total_price}
              </td>
              <td className="border border-gray-300 px-4">
                {item.transaction_date}
              </td>
              <td className="border border-gray-300 px-4 ">
                <div className="flex justify-center ">
                  <Pencil color="green" onClick={() => handleEdit(item)} />
                </div>
              </td>
              <td className="border border-gray-300 px-4">
                <div className="flex justify-center ">
                  <Trash2 color="red" onClick={() => handleDelete(item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
