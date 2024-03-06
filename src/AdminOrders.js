import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import getBase from "./api";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom"
import VerifyLogin from "./VerifyLogin";
export default function AdminOrders() {

   VerifyLogin();
  let [data, setData] = useState([]);

  useEffect(() => {
    let apiAddress = getBase() + "orders.php";
    axios({
      method: "get",
      url: apiAddress,
      responseType: "json",
    }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        showError("server not available. please contact administrator");
      } else {
        let error = response.data[0]['error'];
        if (error !== "no") {
          showError(error);
        } else if (response.data[1]["total"] === 0) {
          showError("no order found");
        } else {
          response.data.splice(0,2);
          setData(response.data);
        }
      }
    });
  });

  let DisplayOrders = function (item) {
    return (<tr className="align-text-top">
      <td>{item.id}</td>
      <td>{item.billdate} </td>
      <td>{item.orderstatus}</td>
      <td>{item.amount}</td>
      <td>
        {item.fullname} <br />
        {item.address1}, <br />
        {item.address2} <br />
        {item.city} - {item.pincode}
      </td>
      <td>
        <Link to={"/orders-detail/" + item.id} title="click to see this  orders details"><i className="bx bxs-box bx-lg mb-2" /></Link>
      </td>
    </tr>)
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <ToastContainer/>
        <AdminMenu />
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3"></div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Orders</h5>
                    <card className="body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <td width="5%">Id</td>
                              <td>Date</td>
                              <td>Status</td>
                              <td>Amount</td>
                              <td>Address</td>
                              <td width="5%">View</td>
                            </tr>
                          </thead>
                          <tbody>
                          {data.map((item) => DisplayOrders(item))}
                          </tbody>
                        </table>
                      </div>
                    </card>
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
