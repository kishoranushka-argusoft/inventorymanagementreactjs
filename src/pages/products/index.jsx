import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import {  useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

const Products = () => {

  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  // const productlength = product.length
  // const { productId } = useParams();

  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
        const response = await axios.get("http://127.0.0.1:8000/api/v1/products/")
        console.log("*******************",response.data);
        setProduct(response.data)
        // console.log(product);
      }
      catch(error){
        console.error("Error fetching products ", error)
      }

    }
    fetchProducts();
  },[])


  const handleEdit =async(productItem)=>{
    console.log("productItemmmmmmm",productItem);
    navigate("/editproduct", {state: {productItem}})
  }

  const handleDelete = async (productId) => {
    console.log("222222222", productId);
    try {
      const getDeleteProductRes = await axios.delete(
        `http://127.0.0.1:8000/api/v1/product/${productId}`
      );
      console.log("product deleted successfully!", getDeleteProductRes); 
      setProduct((prev)=> prev.filter((product)=>product.id !== productId))
      toast.success("product deleted successfully!")
      console.log(productId);
    } 
    catch (error) {
      console.log("error deleting product", error);
    }
  };
  

  return (
    <div className="p-6 ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-600 ">
          All the available prducts
        </h2>
        <div className="flex gap-6">
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/">Dashboard</Link>
          </button>
          <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
            <Link to="/addproduct">Add Products</Link>
          </button>
        </div>
      </div>
      <table className="border-separate border border-gray-400 text-center w-full">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 ">Image</th>
            <th className="border border-gray-300 px-4">Product Name</th>
            <th className="border border-gray-300 px-4">Unit Weight</th>
            <th className="border border-gray-300 px-4">Quantity in Stock</th>
            <th className="border border-gray-300 px-4">Expiry Date</th>
            <th className="border border-gray-300 px-4">Category</th>
            <th className="border border-gray-300 px-4">Seller</th>
            <th className="border border-gray-300 px-4">Created at</th>
            <th className="border border-gray-300 px-4">Updated at</th>
            <th className="border border-gray-300 px-4">Edit</th>
            <th className="border border-gray-300 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300">{idx + 1}</td>
              <td className=" border border-gray-300 flex items-center justify-center">
                <img
                  className="w-36 h-36 object-cover object-center"
                  src={`http://127.0.0.1:8000/${item.image}`}
                  alt=""
                />
              </td>
              <td className="border border-gray-300">{item.name}</td>
              <td className="border border-gray-300">{item.weight}</td>
              <td className="border border-gray-300">
                {item.quantity_in_stock}
              </td>
              <td className="border border-gray-300 px-4">
                {item.expiry_date.split("T")[0]}
              </td>
              <td className="border border-gray-300">{item.category.name}</td>
              <td className="border border-gray-300">
                {item?.seller?.map((seller, index) => (
                  <p key={index} className="">
                    {seller?.name}
                  </p>
                ))}
              </td>
              <td className="border border-gray-300 px-4">
                {item.created_at.split("T")[0]}
              </td>
              <td className="border border-gray-300 px-4">
                {item.updated_at.split("T")[0]}
              </td>
              {/* <td>{item.id}</td> */}
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
}

export default Products