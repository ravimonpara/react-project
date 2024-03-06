import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import showError, { showMessage } from "./toast-message";
import "react-toastify/dist/ReactToastify.css";
import getBase, { getImgBase } from "./api";
import VerifyLogin from "./VerifyLogin";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminCategory() {
  VerifyLogin();
  let [categories, setCategory] = useState([]);

  let DeleteCategory = function (id) {
    console.log(id);

    let apiAddress = getBase() + "delete_category.php?id=" + id;
    axios({
      method: "get",
      url: apiAddress,
      responseType: "json",
    })
      .then((response) => {
        console.log(response);
        let error = response.data[0]["error"];
        if (error !== "no") {
          showError(error);
        } else {
          let temp = categories.filter((item) => {
            if (item.id !== id) return item;
          });
          setCategory(temp);
          showMessage(response.data[1]["message"]);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (categories.length === 0) {
      let apiAddress = getBase() + "category.php";
      fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCategory(data);

          let error = data[0]["error"];
          console.log(error);
          if (error !== "no") alert(error);
          else {
            let total = data[1]["total"];
            if (total === 0) {
              alert("NO category available");
            } else {
              data.splice(0, 2);
              setCategory(data);
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
  });

  let DisplayCategory = function (item) {
    let { id, title, photo, islive, isdeleted } = item;
    return (
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <img
            src={getImgBase() + "category/" + photo}
            className="img-fluid w-25"
            alt="img"
          />
        </td>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <img
            src={getImgBase() + "category/" + photo}
            className="img-fluid"
            alt=""
          />
        </td>
        <td>{islive === "1" ? "Yes" : "No"}</td>
        <td>
          <Link to={"/edit-category/" + id}>
            <i className="bx bx-pencil bx-lg mb-2" />
          </Link>
          <a href="#" onClick={(event) => DeleteCategory(id)}>
            <i className="bx bx-trash bx-lg mb-2" />
          </a>
        </td>
      </tr>
    );
  };

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
                  <h4 className="fw-bold py-1 mb-1">Categories</h4>
                  <a href="/add-category" className="btn btn-primary">
                    Add category
                  </a>
                </div>
              </div>
              {/* Basic Bootstrap Table */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Existing Categories</h5>
                    <div className="table-responsive text-nowrap">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Title</th>
                            <th>Photo</th>
                            <th>Is Live?</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="top-text">
                          {categories.map((item) => DisplayCategory(item))}
                        </tbody>
                      </table>
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
