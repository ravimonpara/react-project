import { ToastContainer } from "react-toastify";
import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
import { useEffect, useState } from "react";
import getBase from "./api";
import showError, { showMessage } from "./toast-message";
import axios from "axios";
import { navigate, useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  VerifyLogin();

  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [file, setFile] = useState("");
  let [stock, setStock] = useState("");
  let [size, setSize] = useState("");
  let [weight, setWeight] = useState("");
  let [comments, setComments] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("");
  let [isLive, setIsLive] = useState("");

  let AddProduct = function (e) {
    e.preventDefault(); //required to stop submitting form & refreshing web page
    console.log(name, price, file, stock, size, weight, comments, isLive);

    //api call
    let apiaddress = getBase() + "insert_product.php";
    let form = new FormData();
    form.append("name", name);
    form.append("photo", file);
    form.append("price", price);
    form.append("stock", stock);
    // form.append("size", size);
    // form.append("weight", weight);
    form.append("detail", comments);
    form.append("categoryid", selectedCategory);
    // form.append("isLive", isLive);
    //name,photo,price,stock,detail,categoryid
    console.log(form);

    axios({
      method: "post",
      url: apiaddress,
      responseType: "json",
      data: form,
    }).then((response) => {
      console.log(response);

      let error = response.data[0]["error"];
      if (error !== "no") {
        showError(error);
      } else {
        let success = response.data[1]["success"];
        let message = response.data[2]["message"];
        if (success == "no") {
          showError(message);
        } else {
          showMessage(message);
          setTimeout(() => {
            navigate("/product");
          }, 2000);
        }
      }
    });
  };

  let [categories, setCategory] = useState([]);

  useEffect(() => {
    //fetch category id & title 
    if (categories.length === 0) {
      let apiAddress = getBase() + 'category.php';
      //call api 
      fetch(apiAddress)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          //get 1st object's key error
          let error = data[0]['error'];
          console.log(error);
          if (error !== 'no')
            alert(error);
          else {
            //get 2nd object's key total
            let total = data[1]['total']
            if (total === 0) {
              alert('no category available');
            }
            else {
              //delete 2 object from begining
              data.splice(0, 2);
              //store data into state
              setCategory(data);
              // console.log(categories);
            }
          }
        })
        .catch(error => {
          console.log(error);
          showError('networking error!, its seems your internet connection is not working');
        });
    }
  })

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminMenu />
        <ToastContainer />
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between">
                  <h4 className="fw-bold py-1 mb-1">Products</h4>
                  <a href="edit-product" className="btn btn-primary">
                    back{" "}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Add new product</h5>
                    <div className="card-body">
                      <form
                        onSubmit={AddProduct}
                        encType="multipart/form-data"
                        method="post"
                      >
                        <div className="row">
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <label htmlFor="name">Name</label>
                            </div>
                          </div>
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                              <label htmlFor="price">Price</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="formFile" className="form-label">
                              Select photo
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              id="formFile"
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="stock"
                                placeholder="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                              />
                              <label htmlFor="stock">Stock</label>
                            </div>
                          </div>
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="size"
                                placeholder="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                              />
                              <label htmlFor="size">Size</label>
                              
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="weight"
                                placeholder="Weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                              />
                              <label htmlFor="stock">Weight</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 pt-2">
                            <select
                              className="form-select"
                              aria-label="Default select"
                              value={selectedCategory}
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }>
                             {categories.map((item) => {
                                return <option value={item.id}>{item.title}</option>
                              })}
                            </select>
                            
                          </div>
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea"
                                style={{ height: 100 }}
                                defaultValue={""}
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                              />
                              <label htmlFor="floatingTextarea">Comments</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label className="form-label">Is Live</label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="isLive"
                                id="yes"
                                defaultValue="yes"
                                required=""
                                value={isLive}
                                onChange={(e) => setComments(e.target.value)}
                              />
                              <label className="form-check-label" htmlFor="yes">
                                Yes
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="isLive"
                                id="no"
                                defaultValue="no"
                                required=""
                                value={isLive}
                                onChange={(e) => setIsLive(e.target.value)}
                              />
                              <label className="form-check-label" htmlFor="no">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary">
                              Save changes
                            </button>
                            <button type="reset" className="btn btn-secondary">
                              Clear all
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
