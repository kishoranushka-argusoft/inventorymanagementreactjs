import React, { useEffect, useState } from "react";
import { inputData } from "./data";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const AddTransactionForm = ({name}) => {
  const formtype = name;
  console.log(formtype);
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [transactionId, setTransactionId] = useState("");

  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    transactions_type: "",
  });

  const transactions_type = ["S", "A", "R"];

  useEffect(() => {
    console.log("useeffect run------------!!!");
    const fetchAllProducts = async () => {
      const productres = await axios.get(
        "http://127.0.0.1:8000/api/v1/products/"
      );

      setProduct(productres.data);
    };

    if (formtype == "Edit") {  

      const transactionItem = location.state.transactionItem || {};
      const transactionId = location.state.transactionItem.id;
      setTransactionId(transactionId);

      setFormData({
        product: transactionItem.product,
        quantity: transactionItem.quantity,
        transactions_type: transactionItem.transactions_type,
      });
    }

    fetchAllProducts();
  }, []);

    const handleEdit = async (transactionId) => {
      // console.log(productId);
      const formDataToSend = new FormData();
      formDataToSend.append("product", formData.product);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("transactions_type", formData.transactions_type);
      try {
        console.log("###################", formData);
        const editRes = await axios.put(
          `http://127.0.0.1:8000/api/v1/transaction/${transactionId}`,
          formDataToSend,
          {
            headers: {
              "content-Type": "multipart/form-data",
            },
          }
        );
        console.log("==========================", editRes.data);
        toast.success("Transaction updated successfully!");
        navigate("/transactions");
      } catch (error) {
        toast.error("Error updating transaction!");
        console.log("Error updating transaction!", error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData before sending------------>", formData);
    const formDataToSend = new FormData();
    formDataToSend.append("product", formData.product);
    formDataToSend.append("transactions_type", formData.transactions_type);
    formDataToSend.append("quantity", formData.quantity);

    //debug
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
      // console.log("value: ",value);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/transactions/",
        formDataToSend,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log("transaction added: ", res.data);
      toast.success("transaction added successfully!");
      navigate("/transactions");
    } catch (error) {
      console.error("error adding transaction", error);
      toast.error("Error adding transaction!");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="bg-blue-100  p-6 items-center min-h-screen">
        <div className=" flex gap-6 items-end justify-end">
          <button className="p-2 px-6 bg-blue-500 font-semibold text-white rounded-md">
            <Link to="/"> Dashboard</Link>
          </button>
          <button className="p-2 px-6 bg-blue-500 font-semibold text-white rounded-md">
            <Link to="/transactions"> View all transactions</Link>
          </button>
        </div>
        <div className="w-full">
          <h2 className="text-center text-blue-500 font-bold text-2xl uppercase my-10">
            {name} Transaction
          </h2>
          <div className="bg-white p-10 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/2">
            <form
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                formtype == "Add" ? handleSubmit(e) : handleEdit(transactionId);
              }}
            >
              <div className="mb-5">
                <label
                  className="block mb-2 font-bold text-gray-600"
                  htmlFor="category"
                >
                  Choose a Product:
                </label>
                <select
                  name="product"
                  id="product"
                  value={formData.product}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product: e.target.value,
                    })
                  }
                  className="border border-gray-300 shadow p-3 w-full rounded "
                >
                  <option value="">Choose a Product</option>
                  {product.map((ele, idx) => (
                    <option key={idx} value={ele.id}>
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>
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
              <div className="mb-5">
                <label
                  className="block mb-2 font-bold text-gray-600"
                  htmlFor="category"
                >
                  Choose a Transaction type:
                </label>
                <select
                  name="transactions_type"
                  id="transactions_type"
                  value={formData.transactions_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactions_type: e.target.value,
                    })
                  }
                  className="border border-gray-300 shadow p-3 w-full rounded "
                >
                  <option value="">Choose a transaction type</option>
                  {transactions_type.map((ele, idx) => (
                    <option key={idx} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>

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

export default AddTransactionForm;
