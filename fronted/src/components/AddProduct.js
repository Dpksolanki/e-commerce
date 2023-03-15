import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    console.warn(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(userId);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      header: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="product">
      <h3>Product List</h3>
      <input
        type="text"
        placeholder="Enter Product name"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter Product price"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter Product category"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter Product company"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid name</span>
      )}

      <button onClick={addProduct} className="button  ">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
