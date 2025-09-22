import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";


const Categories = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/categories/"
        );
        console.log("*******************", response.data);
        setCategory(response.data);
        console.log(category);
      } catch (error) {
        console.error("Error fetching products ", error);
      }
    };
    fetchCategory();
  }, []);

  const handleEdit = async (categoryItem) => {
    console.log(categoryItem);
    navigate("/editcategory", { state: { categoryItem } });
  };

  const handleDelete = async (categoryId) => {
    console.log("categoryid------->", categoryId);
    try {
      const getDeleteCategoryRes = await axios.delete(
        `http://127.0.0.1:8000/api/v1/category/${categoryId}`
      );
      console.log("Category deleted successfully!", getDeleteCategoryRes);
      setCategory((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
      toast.success("Category deleted successfully!")
      console.log(categoryId);
    } catch (error) {
      console.log("error deleting category", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-600 mb-6">
          All the available Categories
        </h2>
        <div className="flex gap-6">
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/">Dashboard</Link>
          </button>
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/addcategory">Add Category</Link>
          </button>
        </div>
      </div>

      <table class="border-separate border border-gray-400 text-center w-full">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 ">Image</th>
            <th className="border border-gray-300 px-4">Category Name</th>
            <th className="border border-gray-300 px-4">Created at</th>
            <th className="border border-gray-300 px-4">Updated at</th>
            <th className="border border-gray-300 px-4">Edit</th>
            <th className="border border-gray-300 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, idx) => (
            <tr>
              <td className="border border-gray-300">{idx + 1}</td>
              <td className="border border-gray-300">
                <div className="flex justify-center">
                  <img
                    className="w-36 h-36 object-cover object-center"
                    src={`http://127.0.0.1:8000/${item.image}`}
                    alt=""
                  />
                </div>
              </td>
              <td className="border border-gray-300">{item.name}</td>
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

export default Categories;
