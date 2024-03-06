import AdminMenu from "./AdminMenu";
import axios from 'axios'
import { useEffect, useState } from "react";
import getBase from "./api";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import VerifyLogin from "./VerifyLogin";
export default function AdminOrderPrint() {
  
    VerifyLogin();
  return(<div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
    <ToastContainer/>
   <AdminMenu/>
    <div className="layout-page">
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row mb-3">
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5>Orders Detail</h5>
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
                          <td>Confirmed</td>
                          <td>City</td>
                          <td>Bhavngar-364250</td>
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
                          <td className="text-end">170000</td>
                          <td className="text-end">2</td>
                          <td className="text-end">340000</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Grand total</th>
                          <th colSpan={5} className="text-end text p-2">
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
