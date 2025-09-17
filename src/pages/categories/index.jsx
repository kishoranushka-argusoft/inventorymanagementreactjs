import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-600 mb-6">
        All the available Categories
      </h2>

      <table class="border-separate border border-gray-400 text-center">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 ">Image</th>
            <th className="border border-gray-300 px-4">Category Name</th>
            <th className="border border-gray-300 px-4">Created at</th>
            <th className="border border-gray-300 px-4">Updated at</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, idx) => (
            <tr>
              <td className="border border-gray-300">{idx+1}</td>
              <td className="border border-gray-300">
                <img
                  className="w-36 h-36 object-cover object-center"
                  src={`http://127.0.0.1:8000/${item.image}`}
                  alt=""
                />
              </td>
              <td className="border border-gray-300">{item.name}</td>
              <td className="border border-gray-300 px-4">{item.created_at}</td>
              <td className="border border-gray-300 px-4">{item.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
