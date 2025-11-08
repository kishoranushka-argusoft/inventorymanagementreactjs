import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";



const Sellers = () => {

  const navigate = useNavigate();

  const [seller, setSeller] = useState([]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/sellers/"
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


  const handleEdit = async (sellerItem) => {
    // console.log("sellerItemmmmmmm", sellerItem);
    navigate("/editseller", { state: { sellerItem } });
  };

  const handleDelete = async (sellerId) => {
    console.log("222222222", sellerId);
    try {
      const getDeleteSellerRes = await axios.delete(
        `http://127.0.0.1:8000/api/v1/seller/${sellerId}`
      );
      console.log("seller deleted successfully!", getDeleteSellerRes);
      setSeller((prev) => prev.filter((seller) => seller.id !== sellerId));
      toast.success("seller deleted successfully!");
      console.log(sellerId);
    } catch (error) {
      console.log("error deleting seller", error);
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-600 ">
          All the available sellers
        </h2>
        <div className="flex gap-6">
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/">Dashboard</Link>
          </button>
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/addseller">Add Sellers</Link>
          </button>
        </div>
      </div>

      <table class="border-separate border border-gray-400 text-center w-full">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 ">Name</th>
            <th className="border border-gray-300 px-4">Email</th>
            <th className="border border-gray-300 px-4">Phone No.</th>
            <th className="border border-gray-300 px-4">Created at</th>
            <th className="border border-gray-300 px-4">Updated at</th>
            <th className="border border-gray-300 px-4">Edit</th>
            <th className="border border-gray-300 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {seller.map((item, idx) => (
            <tr>
              <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
              <td className="border border-gray-300 px-4">{item.name}</td>
              <td className="border border-gray-300 px-4">{item.email}</td>
              <td className="border border-gray-300 px-4">{item.phone}</td>
              <td className="border border-gray-300 px-4">
                {item.created_at.split("T")[0]}
              </td>
              <td className="border border-gray-300 px-4">
                {item.updated_at.split("T")[0]}
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

export default Sellers;
