import React, { useEffect, useState } from "react";
import { inputData } from "./data";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryForm = ({ name }) => {
  const formtype = name;
  console.log(formtype);
  const navigate = useNavigate();
  const location = useLocation();


  const [productId, setProductId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });



  const handleEdit = async (categoryId) => {
    console.log(categoryId);
    try {
      const editRes = await axios.put(
        `http://127.0.0.1:8000/api/v1/category/${categoryId}`,
        formData
      );
      console.log("==========================", editRes.data);
      toast.success("Category updated successfully!");
      navigate("/categories");
    } catch (error) {
      toast.error("Error updating category!");
      console.log("Error updating category!", error);
    }
  };

  useEffect(() => {
    console.log("useeffect run------------!!!");
    if (formtype == "Edit") {
      console.log("Edit category called!!!!!!!!!");
      console.log("category item----->", location.state.categoryId);

      const categoryItem = location.state.categoryItem || {};
      console.log("categoryItem-->", categoryItem);
      const categoryId = location.state.categoryItem.id;
      console.log("categoryId", categoryId);
      setProductId(categoryId);

      setFormData({
        name: categoryItem.name,
      });
      console.log("^^^^^^^^^^^^^^^^", categoryItem);
    }
  }, []);

  // console.log("****************1234", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData---------->", formData);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/categories/",
        formData
      );
      console.log("Category added: ", res.data);
      toast.success("Category added successfully!");
      navigate("/categories");
    } catch (error) {
      console.error("error adding category", error);
      toast.error("Error adding category!");
    }
  };

  return (
    <>
      <div className="bg-blue-100  p-6 items-center min-h-screen">
        <div className=" flex gap-6 items-end justify-end">
          <button className="p-2 bg-blue-500 font-semibold text-white rounded-md">
            <Link to="/"> Dashboard</Link>
          </button>
          <button className="p-2 bg-blue-500 font-semibold text-white rounded-md">
            <Link to="/categories"> View all Categories</Link>
          </button>
        </div>
        <div className="w-full">
          <h2 className="text-center text-blue-500 font-bold text-2xl uppercase my-10">
            {name} Category
          </h2>
          <div className="bg-white p-10 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formtype == "Add" ? handleSubmit(e) : handleEdit(productId);
              }}
            >
              {inputData.map((ele, idx) => (
                <div className="mb-5" key={idx}>
                  <label
                    htmlFor={ele.htmlFor}
                    className="block mb-2 font-bold text-gray-600"
                  >
                    {ele.field}
                  </label>
                  <input
                    value={formData[ele.name] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type={ele.type}
                    id={ele.id}
                    name={ele.name}
                    placeholder={ele.placeholder}
                    required
                    className="border border-gray-300 shadow p-3 w-full rounded "
                  />
                </div>
              ))}

              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
