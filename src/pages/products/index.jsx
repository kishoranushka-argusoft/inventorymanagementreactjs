import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
  const [product, setProduct] = useState([])

  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
        const response = await axios.get("http://127.0.0.1:8000/api/v1/products/")
        console.log("*******************",response.data);
        setProduct(response.data)
        console.log(product);
      }
      catch(error){
        console.error("Error fetching products ", error)
      }

    }
    fetchProducts();
  },[])

  

  return (
    <div className="p-6 ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-600 ">
          All the available prducts
        </h2>
        <button className="p-2 bg-blue-500 rounded-md text-white font-semibold">
          <Link to="/addproduct">Add Products</Link>
        </button>
      </div>
      <table class="border-separate border border-gray-400 text-center w-full">
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
          </tr>
        </thead>
        <tbody>
          {product.map((item, idx) => (
            <tr>
              <td className="border border-gray-300">{idx + 1}</td>
              <td className="border border-gray-300">
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
                {item.expiry_date}
              </td>
              <td className="border border-gray-300">{item.category}</td>
              <td className="border border-gray-300">{item.seller}</td>
              <td className="border border-gray-300 px-4">{item.created_at}</td>
              <td className="border border-gray-300 px-4">{item.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products