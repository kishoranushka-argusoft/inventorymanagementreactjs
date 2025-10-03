import React, { useEffect, useState } from "react";
import { inputData } from "./data";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const AddProductForm = ({ name }) => {
  const formtype = name;
  console.log(formtype);
  const navigate = useNavigate();
  const location = useLocation();


  const [category, setCategory] = useState([]);
  const [seller, setSeller] = useState([]);
  const [productId, setProductId] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    seller: [],
    name: "",
    price: "",
    weight: "",
    expiry_date: "",
    quantity_in_stock: "",
    image: null,
  });


  useEffect(() => {
    console.log("useeffect run------------!!!");
    const fetchCategoriesandSellers = async () => {
      const categoryres = await axios.get(
        "http://127.0.0.1:8000/api/v1/categories/"
      );
      const sellerres = await axios.get(
        "http://127.0.0.1:8000/api/v1/sellers/"
      );
 
      setCategory(categoryres.data);
      setSeller(sellerres.data);
    };
    if (formtype == "Edit") {
     
      console.log("type", typeof(formData.image));

      const productItem = location.state.productItem || {};
      const productId = location.state.productItem.id;
      setProductId(productId);

      setFormData({
        category: productItem.category.id,
        seller: productItem.seller.map((s) => s.id),
        name: productItem.name,
        price: productItem.price,
        weight: productItem.weight,
        expiry_date: productItem.expiry_date?.split("T")[0] || "",
        quantity_in_stock: productItem.quantity_in_stock,
        image: productItem.image,
      });
    }

    fetchCategoriesandSellers();
  }, []);


  const handleEdit = async (productId) => {
    // console.log(productId);
    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("weight", formData.weight);
    formDataToSend.append("expiry_date", formData.expiry_date);
    formDataToSend.append("quantity_in_stock", formData.quantity_in_stock);
    // console.log(typeof(formData.image));
    if (formData.image && typeof(formData.image) != "string") {
      formDataToSend.append("image", formData.image);
    }
    if (formData.seller && Array.isArray(formData.seller)) {
      formData.seller.forEach((sellerId) => {
        formDataToSend.append("seller", sellerId);
      });
    }


    
    try {
      console.log("###################", formData);
      const editRes = await axios.put(
        `http://127.0.0.1:8000/api/v1/product/${productId}`,
        formDataToSend,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log("==========================", editRes.data);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Error updating product!");
      console.log("Error updating product!", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData before sending------------>",formData);
    console.log("seller selected:------>", formData.seller);
    console.log("Seller types: ",typeof formData.seller);
    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("weight", formData.weight);
    formDataToSend.append("expiry_date", formData.expiry_date);
    formDataToSend.append("quantity_in_stock", formData.quantity_in_stock);
    if(formData.image){
      formDataToSend.append("image",formData.image)
    }
    if(formData.seller && Array.isArray(formData.seller)){
      formData.seller.forEach((sellerId)=>{
        formDataToSend.append("seller", sellerId)
      })
    }


    //debug
    for(let [key, value] of formDataToSend.entries()){
      console.log(key, value);
      // console.log("value: ",value);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/products/",
        formDataToSend,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log("products added: ", res.data);
      toast.success("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("error adding product", error);
      toast.error("Error adding product!");
    }
  };


  useEffect(()=>{
    console.log(formData);
  },[formData])

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
            <form
              encType="multipart/form-data"
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

                <div>
                  {seller.map((ele,idx)=>(
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" value={ele.id} checked={formData.seller.includes(ele.id)} onChange={(e)=>{
                        if(e.target.checked){
                          setFormData({...formData, seller:[...formData.seller, ele.id]})
                        }
                        else{
                          setFormData({...formData,seller:formData.seller.filter((id)=> id!== ele.id)})
                        }
                      }} />
                      {ele.name}
                    </label>
                  ))}
                </div>
              </div>

              {formData.image && ( <img src={formData.image instanceof File? URL.createObjectURL(formData.image): formData.image.startsWith("http")?formData.image:`http://127.0.0.1:8000${formData.image}`} alt="Current image" width={100} />)}

              <div className="mb-5">
                <label
                  className="block mb-2 font-bold text-gray-600"
                  htmlFor="image"
                >
                  Choose an image:
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="border border-gray-300 shadow p-3 w-full rounded "
                />
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
