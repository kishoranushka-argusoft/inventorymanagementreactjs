import React, { useEffect, useState } from "react";
import { inputData } from "./data";
import axios from "axios";

const AddProductForm = () => {
  // const [product, setProduct] = useState("");
  // const [unitprice, setUnitprice] = useState(0);
  // const [weight, setWeight] = useState(0);
  // const [quantity, setQuantity] = useState(0);
  // const [expirydate, setExpiryDate] = useState();
  const [category, setCategory] = useState([]);
  const [seller, setSeller] = useState([]);
  // const [category, setcategory] = useState("");
  // const [seller, setseller] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    seller: "",
    name: "",
    price: "",
    weight: "",
    expiry_date: "",
    quantity_in_stock: "",
  });

  useEffect(() => {
    const fetchCategoriesandSellers = async () => {
      const categoryres = await axios.get(
        "http://127.0.0.1:8000/api/v1/categories/"
      );
      const sellerres = await axios.get(
        "http://127.0.0.1:8000/api/v1/sellers/"
      );
      console.log(categoryres.data);
      console.log(sellerres);
      setCategory(categoryres.data);
      setSeller(sellerres.data);
    };
    fetchCategoriesandSellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("!!!!!!!!!!!!!!!", e);
    console.log("Seller ----------->", seller);
    console.log("Category ------->", category);
    console.log("category----------->", formData.category);
    console.log("seller ---------->", formData.seller);
    console.log("FormData---------->", formData);

    try{
      const res = await axios.post("http://127.0.0.1:8000/api/v1/products/",formData)
      console.log("products added: ", res.data);
    }
    catch(error){
      console.error("error adding product", error)
    }
  };

  return (
    <>
      <div className="bg-blue-200 min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-center text-blue-500 font-bold text-2xl uppercase my-10">
            Fill out the form to add Product
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="" method="post" onSubmit={handleSubmit}>
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
                  Choose a Category:
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="border border-gray-300 shadow p-3 w-full rounded "
                >
                  <option value="">Choose a category</option>
                  {category.map((ele, idx) => (
                    <option key={idx} value={ele.id}>
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 font-bold text-gray-600"
                  htmlFor="seller"
                >
                  Choose a Seller:
                </label>
                <select
                  name="seller"
                  id="seller"
                  value={formData.seller}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seller: e.target.value,
                    })
                  }
                  className="border border-gray-300 shadow p-3 w-full rounded "
                >
                  <option value="">Choose a Seller</option>

                  {seller.map((ele, idx) => (
                    <option key={idx} value={ele.id}>
                      {ele.name}
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

export default AddProductForm;
