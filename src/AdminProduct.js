import AdminMenu from "./AdminMenu";
import { useState, useEffect } from "react";
import getBase from "./api";
import showError from "./toast-message";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyLogin from "./VerifyLogin";

export default function AdminProduct() {
  VerifyLogin();
  //create state list/array
  let DeleteProduct = function(id){
    console.log(id)
 }


  //inner function
  let DisplayProduct = function (item) {
    <ToastContainer/>
    return (<tr>
      <td>{item.id}</td>
      <td>{item.title}
        <br />
        <b className="text-danger">({item.categorytitle})</b>
      </td>
      <td>{item.price}
        <br />
        <h6 className="bg-info p-1 mt-2 text-white">({item.islive === '1' ? 'Live' : 'Not Live'})</h6>
      </td>
      <td width='30%'>
      <img src={"https://www.theeasylearnacademy.com/shop/images/product/" + item.photo} className="img-fluid" alt="" />
      </td>
      <td width="22%">
        <Link to ={"/edit-product/" + item.id}><i className="bx bx-pencil mb-2 bx-lg" /></Link>
        <a href="#" onClick={(event) => DeleteProduct(id)}> <i className="bx bx-trash bx-lg mb-2" /></a>
        <Link to={"/view-product-detail/" + item.id}> <i className="bx bx-detail bx-lg mb-2" /></Link>
      </td>
    </tr>)
  }
  
  
  let [products, setProduct] = useState([]);
  useEffect(() => {
    //api calling 
    if (products.length === 0) {
      var apiAddress = getBase() + "product.php";
      fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //create variable that has error detail
          let error = data[0]['error'];
          if (error !== 'no') {
            //there is an error
            alert(error);
          }
          else {
            let total = data[1]['total'];
            if (total === 0)
              alert('no product available')
            else {
              data.splice(0, 2); //delete 1st 2 element from an array
              setProduct(data);
            }
          }
        }).catch((error) => {
          showError('networking error!, its seems your internet connection is not working');
        
        });
    }
  });

  return (<div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      <AdminMenu />
      <div className="layout-page">

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between">
                <h4 className="fw-bold py-1 mb-1">Products</h4>
                <a href="/add-product" className="btn btn-primary">Add product</a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <h5 className="card-header">Existing Product</h5>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Sr no</th>
                            <th>Name <br /> Category</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="top-text">
                          {products.map((item) => DisplayProduct(item))}
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
  </div>);
}