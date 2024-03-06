import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import getBase from "./api";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import VerifyLogin from "./VerifyLogin";

export default function AdminOrdersDetail() {

  VerifyLogin();
  let [data, setData] = useState({});
  //fetch parameter passed in url http://localhost:3000/orders-detail/15
  var { orderid } = useParams(); //object destructring
  console.log(orderid);

  useEffect(() => {
    let apiAddress = getBase() + "orders.php?id=" + orderid;
    axios({
      method: "get",
      url: apiAddress,
      responseType: "json",
    }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        showError("opps, something wrong plase contact administrator");
      } else if (response.data[0]["error"] !== "no") {
        showError(response.data[0]["error"]);
      } else if (response.data[1]["total"] === 0) {
        showError("no order found");
      } else {
        setData(response.data[2]);
      }
    });
  });

  let DisplayStatus = function (orderstatus) {
    if (orderstatus === "1") return "Confirmed";
    else if (orderstatus === "2") return "Dispatched";
    else if (orderstatus === "3") return "Delivered";
    else if (orderstatus === "4") return "Canceled";
  };

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
                    <div className="card-header d-flex justify-content-between">
                      <h5>Orders Detail</h5>
                      <a
                        href="admin-order-print.html"
                        className="btn btn-info text-white"
                      >
                        Print
                      </a>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-sm">
                          <tbody>
                            <tr>
                              <td>Id</td>
                              <td>100</td>
                              <td>Customer ID</td>
                              <td>10102</td>
                            </tr>
                            <tr>
                              <td>Date</td>
                              <td>jun-26 2024</td>
                              <td>Name</td>
                              <td>Ravi Monpara</td>
                            </tr>
                            <tr>
                              <td>Amount</td>
                              <td>170000</td>
                              <td>Adress</td>
                              <td>
                                105, Eva - surbhi, <br />
                                opp Aksharwadi
                              </td>
                            </tr>
                            <tr className="align-text-top">
                              <td>
                                Status <br />
                                <select className="m-2">
                                  <option value="">Select Status</option>
                                  <option value={1}>Confirmed</option>
                                  <option value={2}>Dispatched</option>
                                  <option value={3}>Delivered</option>
                                  <option value={4}>Canceled</option>
                                </select>
                                <br />
                                <input
                                  type="submit"
                                  className="btn btn-danger w-100"
                                  defaultValue="Change orders details"
                                />
                              </td>
                              <td>{DisplayStatus(data.orderstatus)}</td>
                              <td>City</td>
                              <td>{data.city}-{data.pincode}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-sm mt-5">
                          <thead>
                            <tr>
                              <td>ID</td>
                              <td>Name</td>
                              <td>Photo</td>
                              <td>Price</td>
                              <td>Quantity</td>
                              <td>Total</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>IPhone</td>
                              <td>
                                <img
                                  src="https://picsum.photos/100"
                                  className="img-fluid"
                                  alt=""
                                />
                              </td>
                              <td className="text-end">170000</td>
                              <td className="text-end">2</td>
                              <td className="text-end">340000</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Grand total</th>
                              <th colSpan={5} className="text-end text">
                                340000
                              </th>
                            </tr>
                          </tfoot>
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
    </div>
  );
}
