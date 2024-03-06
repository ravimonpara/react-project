import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import getBase, { getImgBase } from "./api";
import axios from "axios";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import VerifyLogin from "./VerifyLogin";

export default function AdminViewProductDetail() {

    VerifyLogin();
  //create state object
  let [product, setProduct] = useState({});
  let fetchParameter = function () {

    /* fetch id of the product supplied as query string 
    http://localhost:3000/view-product-detail/10
    
    */

    //store url into variable     
    let url = window.location.href;
    //find position of last forward slash
    let last_slash_position = url.lastIndexOf("/") + 1;
    //  console.log(last_slash_position);
    //  console.log(url);
    let parameter = url.substring(last_slash_position);
    return parameter;
  }
  useEffect(() => {
    if (product.id === undefined) {
      let productid = fetchParameter();
      var apiAddress = getBase() + "product.php?productid=" + productid;
      // console.log(apiAddress);
      axios({
        url: apiAddress,
        method: "get",
        responseType: "json"
      }).then((response) => {
        console.log(response);
        if (response.status !== 200) {
          showError('page not found');
        }
        else if (response.data[0]['error'] !== 'no') {
          showError(response.data[0]['error'])
        }
        else if (response.data[1]['total'] === 0) {
          showError('no product found')
        }
        else {
          setProduct(response.data[2]);
        }
      }).catch((error) => showError('oops, something went wrong'));

    }
  });

  return (<div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      <ToastContainer />
      <AdminMenu />
      <div className="layout-page">

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between">
                <h4 className="fw-bold py-1 mb-1">Products</h4>
                <a href="admin-product.html" className="btn btn-primary">Back</a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <h5 className="card-header">Existing Product</h5>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tbody className="top-text">
                          <tr>
                            <td width="25%">Category</td>
                            <td>{product.categorytitle}</td>
                          </tr>
                          <tr>
                            <td width="25%">Product Id</td>
                            <td>{product.id}</td>
                          </tr>
                          <tr>
                            <td width="25%">Name</td>
                            <td>{product.title}</td>
                          </tr>
                          <tr>
                            <td width="25%">Price</td>
                           <td>{product.price}</td>
                          </tr>
                          <tr>
                            <td width="25%">Stock</td>
                            <td>{product.stock}</td>
                          </tr>
                          <tr>
                            <td width="25%">Weight</td>
                            <td>{product.weight}</td>
                          </tr>
                          <tr>
                            <td width="25%">Size</td>
                            <td>{product.size}</td>
                          </tr>
                          <tr>
                            <td width="25%">Detail</td>
                            <td>{product.detail}</td>
                          </tr>
                          <tr>
                            <td width="25%">Photo</td>
                            <td>
                            <img src={getImgBase() + "product/" + product.photo} className="img-fluid" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Basic Bootstrap Table */}
          </div>
        </div>
      </div>
    </div>
  </div>);
}