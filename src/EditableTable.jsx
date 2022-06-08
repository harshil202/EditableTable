import React, { useEffect, useState } from "react";
import axios from "axios";

const EditableTable = () => {
  const [productData, setProductData] = useState([]);
  const [productQty, setProductQuantity] = useState();
  const [productAmount, setProductAmount] = useState();
  const [productPrice, setProductPrice] = useState();
  const [show, setShow] = useState();
  const [allData, setAllData] = useState({});
  const [showButton, setShowButton] = useState();
  useEffect(() => {
    axios.get("http://localhost:3001/products").then((res) => {
      setProductData(res.data);
    });
  }, []);
  console.log(productData);

  const openEdit = (data) => {
    console.log(data, "Item data");
    setShow(data.id);
  };

  const closeEdit = (data) => {
    axios
      .put(`http://localhost:3001/products/${data.id}`, {
        id: data.id,
        productName: data.productName,
        productQty: productQty,
        productPrice: productAmount,
      })
      .then((res) => {
        axios.get("http://localhost:3001/products").then((res) => {
          setProductData(res.data);
        });
        setShow("svdfbdfbd");
      });
  };
  console.log("Fdfb", "qqqq");

  const onDelete = (data) => {
    axios.delete(`http://localhost:3001/products/${data.id}`).then((res) => {
      axios.get("http://localhost:3001/products").then((res) => {
        setProductData(res.data);
      });
    });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th hidden={true}>ID</th>
            <th>Productname</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {productData.map((item) => {
            return (
              <tr>
                <td hidden={true}>{item.id}</td>
                <td>{item.productName}</td>
                {show == item.id ? (
                  <td>
                    <input
                      type="number"
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                  </td>
                ) : (
                  <td>{item.productQty}</td>
                )}
                {show == item.id ? (
                  <td>
                    <input
                      type="number"
                      onChange={(e) => setProductAmount(e.target.value)}
                    />
                  </td>
                ) : (
                  <td>{item.productPrice}</td>
                )}

                <td>{item.productQty * item.productPrice}</td>
                {show == item.id ? (
                  <td>
                    <button onClick={() => closeEdit(item)}>Save</button>{" "}
                    <button onClick={() => onDelete(item)}>Delete</button>
                  </td>
                ) : (
                  <td>
                    <button onClick={() => openEdit(item)}>Edit</button>{" "}
                    <button onClick={() => onDelete(item)}>Delete</button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
