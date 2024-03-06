import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBase, { getImgBase } from "./api";
import axios from "axios";
import showError, { showMessage } from "./toast-message";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminEditProduct() {
  VerifyLogin();
  let navigate = useNavigate();
  let { productid } = useParams();
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [file, setFile] = useState("null");
  let [oldPhoto, setOldPhoto] = useState("");
  let [photo, setPhoto] = useState("");
  let [stock, setStock] = useState("");
  let [size, setSize] = useState("");
  let [weight, setWeight] = useState("");
  let [comments, setComments] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("");
  let [isLive, setIsLive] = useState("");
  let [isFetched, setIsFetched] = useState(false);
  let [categories, setCategory] = useState([]);

  let fetchProductDetail = function () {
    if (isFetched === false) {
      let apiAddress = getBase() + "product.php?productid=" + productid;
      console.log(apiAddress);
      axios({
        method: "get",
        responseType: "json",
        url: apiAddress,
      }).then((response) => {
        console.log(response);
        let error = response.data[0]["error"];
        if (error !== "no") showError(error);
        else if (response.data[1]["total"] === 0) {
          showError("product not found");
        } else {
          setName(response.data[2]["title"]);
          setPrice(response.data[2]["price"]);
          setWeight(response.data[2]["weight"]);
          setSize(response.data[2]["size"]);
          setComments(response.data[2]["detail"]);
          setIsLive(response.data[2]["islive"]);
          setOldPhoto(response.data[2]["photo"]);
          setSelectedCategory(response.data[2]["categoryid"]);
          setStock(response.data[2]["stock"]);
          setIsFetched(true);
        }
      });
    }
  };

  let fetchCategory = function () {
    if (categories.length === 0) {
      let apiAddress = getBase() + "category.php";
      //call api
      fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let error = data[0]["error"];
          if (error !== "no") alert(error);
          else {
            let total = data[1]["total"];
            if (total === 0) {
              alert("not category available");
            } else {
              //delete 2 object from begining
              data.splice(0, 2);
              //store data into state
              setCategory(data);
              // console.log(categories);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          showError(
            "networking error!, its seems your internet connection is not working"
          );
        });
    }
  };
  useEffect(() => {
    console.log(productid);
    fetchCategory();
    fetchProductDetail();
  });

  let updateProduct = function (event) {
    event.preventDefault();
    console.log(
      selectedCategory,
      name,
      price,
      size,
      weight,
      stock,
      isLive,
      comments,
      photo
    );

    let apiAddress = getBase() + "update_product.php";
    let form = new FormData();
    form.append("name", name);
    form.append("photo", photo);
    form.append("price", price);
    form.append("stock", stock);
    form.append("detail", comments);
    form.append("categoryid", selectedCategory);
    form.append("productid", productid);
    console.log(form)
    axios({
      method:'post',
      responseType:'json',
      url:apiAddress,
      data:form
    }).then((response) => {
        console.log(response)
        let error = response.data[0]['error']
        if(error !== 'no'){
          showError(error)
        }
        else {
          let success = response.data[1]['success'];
          let message = response.data[2]['message'];
          if (success == 'no') {
            showError(message);
          }
          else {
            showMessage(message);
            setTimeout(() => {
              //below code will execute after 2 second interval
              navigate("/product");
            }, 2000);
          }
        }
    })
  }

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
                  <a href="admin-product.html" className="btn btn-primary">
                    back
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Edit Existing product</h5>
                    <div className="card-body">
                      <form
                        action
                        onSubmit={updateProduct}
                        method="post"
                        encType="multipart/form-data"
                      >
                        <div className="row">
                          <div className="col-lg-3">
                            <b>Existing Photo</b> <br />
                            <img
                              src={
                                "https://www.theeasylearnacademy.com/shop/images/product/" +
                                oldPhoto
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="col-lg-9">
                            <div className="row">
                              <div className="col-lg-4 pt-2">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="name"
                                    value={name}
                                    onChange={(event) =>
                                      setName(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                      setPrice(event.target.value)
                                    }
                                  />
                                  <label htmlFor="price">Price</label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <label
                                  htmlFor="formFile"
                                  className="form-label"
                                >
                                  Select photo
                                </label>
                                <input
                                  className="form-control"
                                  type="file"
                                  id="formFile"
                                  accept="image/*"
                                  onChange={(event) =>
                                    setPhoto(event.target.files[0])
                                  }
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="form-floating mb-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    placeholder="available quantity for sell"
                                    value={stock}
                                    onChange={(event) =>
                                      setStock(event.target.value)
                                    }
                                  />
                                  <label htmlFor="stock">Stock</label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="size"
                                    placeholder="Product Size"
                                    value={size}
                                    onChange={(event) =>
                                      setSize(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                      setWeight(event.target.value)
                                    }
                                  />
                                  <label htmlFor="stock">Weight</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-4">
                                <select
                                  className="form-select"
                                  aria-label="Default select"
                                  onChange={(event) =>
                                    setSelectedCategory(event.target.value)
                                  }
                                >
                                  <option value="">Select Category</option>
                                  {categories.map((item) => {
                                    if (item.id === selectedCategory)
                                      return (
                                        <option value={item.id} selected>
                                          {item.title}
                                        </option>
                                      );
                                    else
                                      return (
                                        <option value={item.id}>
                                          {item.title}
                                        </option>
                                      );
                                  })}
                                  ;
                                </select>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-floating">
                                  <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea"
                                    style={{ height: "100px" }}
                                    value={comments}
                                    onChange={(event) =>
                                      setComments(event.target.value)
                                    }
                                  ></textarea>
                                  <label htmlFor="floatingTextarea">
                                    Comments
                                  </label>
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
                                    value="1"
                                    required
                                    checked={isLive === "1"}
                                    onChange={(event) =>
                                      setIsLive(event.target.value)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    Yes
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isLive"
                                    id="no"
                                    value="0"
                                    required
                                    onChange={(event) =>
                                      setIsLive(event.target.value)
                                    }
                                    checked={isLive === "0"}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="no"
                                  >
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 text-end">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Save changes
                                </button>
                                <button
                                  type="reset"
                                  className="btn btn-secondary"
                                >
                                  Clear all
                                </button>
                              </div>
                            </div>
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
