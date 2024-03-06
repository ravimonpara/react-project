import getBase from "./api";
import showError from "./toast-message";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
export default function AdminUsers() {
   
   VerifyLogin();
  let [users, setUser] = useState([]);

  useEffect(() => {
   
    if(users.length === 0)
    {
      let apiAddress = getBase() + "users.php";
      fetch(apiAddress)
      .then((response) => response.json())
      .then((data) => { 
        console.log(data);
  
        let error = data[0]['error']
        console.log(error);
        if(error !== 'no')
        {
          showError (error);
        }
        else{
          let total = data[1]['total']
          console.log(total)
          if(total === 0)
          showError ('no users available');
        else{
           data.splice(0,2);
           setUser(data);
        }
        }
      })
      .catch((error)=>{
        showError('networking error!, its seems your internet connection is not working');
      });
    }
  });

  let DisplayUsers = function(item)
  {
     return(<tr>
      <td>{item.id}</td>
      <td>{item.email}</td>
      <td>{item.mobile}</td>
      <td>
        <a
          href="admin-orders.html"
          title="click to see this users orders"
        >
          <i className="bx bxs-box bx-lg mb-2" />
        </a>
      </td>
    </tr>)
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminMenu />
        <ToastContainer/>
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between">
                  <h4 className="fw-bold py-1 mb-1">Users</h4>
                  {/* <a href="admin-add-category.html" class="btn btn-primary">Add category</a> */}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header"></h5>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <td width="10%">Sr no</td>
                              <td>Email</td>
                              <td>Mobile</td>
                              <td width="10%">Orders</td>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((item) => DisplayUsers(item))}
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
    </div>
  );
}


