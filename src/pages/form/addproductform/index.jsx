import React, { useEffect, useState } from "react";
import { inputData } from "./data";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";



const AddProductForm = ({name}) => {

  const formtype = name
  console.log(formtype);
  // const formtypename = formtype.name
  // console.log("form type name ----------->",formtypename);
  const navigate = useNavigate()
  const location = useLocation();
  // console.log("locationnnnnnnnnnnn",location);
  // console.log(location.state.productItem.id);
 
  const [category, setCategory] = useState([]);
  const [seller, setSeller] = useState([]);
  const [productId, setProductId] = useState("")


  const [formData, setFormData] = useState({
    category: "",
    seller: "",
    name: "",
    price: "",
    weight: "",
    expiry_date: "",
    quantity_in_stock: "",
  });

  // const productId = location.state.productItem.id;
  // console.log("location", location);
  // console.log("id : ", );
  // console.log("Product id : ---------------->",productId);


  const handleEdit = async(productId)=>{
    
    try{
      const editRes = await axios.put(`http://127.0.0.1:8000/api/v1/product/${productId}`,formData);
      console.log(editRes.data);
      toast.success("Product updated successfully!");
      navigate("/products");


    }catch(error){
      toast.error("Error updating product!");
      console.log("Error updating product!", error);
    }
  }

  useEffect(() => {
    console.log("useeffect run------------!!!");
      const fetchCategoriesandSellers = async () => {
        const categoryres = await axios.get(
          "http://127.0.0.1:8000/api/v1/categories/"
        );
        const sellerres = await axios.get(
          "http://127.0.0.1:8000/api/v1/sellers/"
        );
        console.log("Category---------->",categoryres.data);
        console.log("seller---------->",sellerres);
        setCategory(categoryres.data);
        setSeller(sellerres.data);
      };
      fetchCategoriesandSellers();
      if (formtype == "Edit") {
        console.log("Edit product called!!!!!!!!!");
        const productItem = location.state.productItem || {};
        const productId = location.state.productItem.id;
        setProductId(productId)

        setFormData({
          category: productItem.category,
          seller: productItem.seller,
          name: productItem.name,
          price: productItem.price,
          weight: productItem.weight,
          expiry_date: productItem.expiry_date,
          quantity_in_stock: productItem.quantity_in_stock,
        });
        console.log("^^^^^^^^^^^^^^^^", productItem);
      }
  }, []);

  // console.log("****************1234", formData);

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
      toast.success("Product added successfully!")
      navigate("/products")

    }
    catch(error){
      console.error("error adding product", error)
      toast.error("Error adding product!")
    }
  };

  return (
    <>
      <div className="bg-blue-100  p-6 items-center">
        <div className=" flex gap-6 items-end justify-end">
          <button className="p-2 bg-blue-500 font-semibold text-white rounded-md">
            <Link to="/"> Dashboard</Link>
          </button>
          <button className="p-2 bg-blue-500 font-semibold text-white rounded-md">
            <Link to="/products"> View all products</Link>
          </button>
        </div>
        <div className="w-full">
          <h2 className="text-center text-blue-500 font-bold text-2xl uppercase my-10">
            {name} Product
          </h2>
          <div className="bg-white p-10 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/2">
            <form action="" method={formtype == "Add"? "post":"put"} onSubmit={(e)=>
              {
                formtype == "Add" ? handleSubmit(e) : handleEdit(productId);
              }
            }>
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
