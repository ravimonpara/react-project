import AdminMenu from "./AdminMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import showError, { showMessage } from "./toast-message";
import "react-toastify/dist/ReactToastify.css";
import getBase from "./api";
import axios from "axios";
import VerifyLogin from "./VerifyLogin";

export default function AdminChangePassword() {
  VerifyLogin();
  let [cookies, setCookie, removeCookie] = useCookies(["theeasylearn"]);
  let navigate = useNavigate();
  let ChangePassword = function (event) {
    console.log(password, newpassword, confirmpassword);
    if (newpassword !== confirmpassword) {
      showError("new password and confirm password  are not same");
    } else {
      //api call
      let apiAddress = getBase() + "change_password.php";
      let form = new FormData();
      form.append("password", password);
      form.append("newpassword", newpassword);
      form.append("id", cookies["id"]);
      console.log(form);

      axios({
        method: "post",
        url: apiAddress,
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
          if (success === "no") {
            showError(message);
          } else {
            showMessage(message);
            setTimeout(() =>{
              navigate("/");
            },2000);
          }
        }
      });
    }

    event.preventDefault(); //prevent submitting form
  };

  let [password, setPassword] = useState("");
  let [newpassword, setNewPassword] = useState("");
  let [confirmpassword, setConfirmPassword] = useState("");

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminMenu />
        <ToastContainer />
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3"></div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Change password</h5>
                    <div className="card-body">
                      <form onSubmit={ChangePassword}>
                        <div className="mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="form-label"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            placeholder="Enter your current password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="newPassword" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter your new password"
                            value={newpassword}
                            onChange={(event) =>
                              setNewPassword(event.target.value)
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Enter your confirm password"
                            value={confirmpassword}
                            onChange={(event) =>
                              setConfirmPassword(event.target.value)
                            }
                          />
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Basic Bootstrap Table */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
