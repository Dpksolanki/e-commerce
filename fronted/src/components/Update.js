import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  //const [error,setError] = React.useState(false)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    //console.warn(result)
    setName(result.name);
    //console.warn(result.name)
    setPrice(result.price);
    //console.warn(result.price)
    setCategory(result.category);
    //console.warn(result.category)
    setCompany(result.company);
    //console.warn(result.company)
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      header: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };

  // const addProduct=async()=>{
  //     console.warn(!name);
  //     if(!name || !price || !category || !company ){
  //         setError(true)
  //         return false
  //     }

  //     console.warn(name,price,category,company)
  //     const userId = JSON.parse(localStorage.getItem('user'))._id;
  //     console.warn(userId);
  //     let result =  await fetch("http://localhost:5000/add-product",
  //     {
  //         method:'post',
  //         body:JSON.stringify({name,price,category,company,userId}),
  //         header:{
  //             "content-type": "application/json"
  //         }
  //     });
  //     result = await result.json();
  //     console.warn(result)
  // }

  return (
    <div className="product">
      <h1>Update Project</h1>
      <input
        type="text"
        placeholder="Enter Product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* {error && !name && <span className="invalid-input">Enter Valid name</span>} */}

      <input
        type="text"
        placeholder="Enter Product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {/* {error && !price && <span className="invalid-input">Enter Valid name</span>} */}

      <input
        type="text"
        placeholder="Enter Product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {/* {error && !category && <span className="invalid-input">Enter Valid name</span>} */}

      <input
        type="text"
        placeholder="Enter Product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {/* {error && !company && <span className="invalid-input">Enter Valid name</span>} */}

      <button onClick={updateProduct} className="button">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
