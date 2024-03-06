import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
import { useParams } from "react-router-dom";
import getBase, { getImgBase } from "./api";
import axios from "axios";
import showError, { showMessage } from "./toast-message";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AdminEditCategory() {
  VerifyLogin();
  let { categoryid } = useParams();
  let [title, setTitle] = useState();
  let [oldphoto, setOldPhoto] = useState();
  let [photo, setPhoto] = useState();
  let [islive, setIsLive] = useState();
  let [isFetched, setIsFetched] = useState(false);
  let navigate = useNavigate(); 
  useEffect(() => {
    if (isFetched === false) {
      let apiAddress = getBase() + "category.php?id=" + categoryid;
      axios({
        method: 'get',
        responseType: 'json',
        url: apiAddress
      }).then((response) => {
        console.log(response);
        let error = response.data[0]['error'];
        if (error != 'no')
          showError(error);
        else if (response.data[1]['total'] == 0) {
          showError('no category found');
        }
        else {
          setTitle(response.data[2]['title']);
          setOldPhoto(response.data[2]['photo']);
          setIsLive(response.data[2]['islive']);
          setIsFetched(true);
        }
      }).catch((error) => {
        console.log(error);
        if (error.code === 'ERR_NETWORK')
          showError('OOPS something went wrong, it seems you are offline or server is offline');
      })
    }
  });
  let updateCategory = function (event) {
    event.preventDefault();
    let apiAddress = getBase() + "update_category.php";
    let form = new FormData();
    form.append("title", title);
    form.append("photo", photo);
    form.append("islive", islive);
    form.append("id", categoryid);
    console.log(form);
    axios({
      method: 'post',
      responseType: 'json',
      url: apiAddress,
      data: form
    }).then((response) => {
      console.log(response);
      let error = response.data[0]['error'];
      if (error !== 'no') {
        showError(error);
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
            navigate("/category");
          }, 2000);
        }
      }
    })
  }
  console.log(categoryid);
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminMenu />
        <div className="layout-page">

          <div className="content-wrapper">
            {/* Content */}
            <ToastContainer />
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between">
                  <h4 className="fw-bold py-1 mb-1">Category</h4>
                  <a href="admin-category.html" className="btn btn-primary">Back</a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Edit category</h5>
                    <div className="card-body">
                      <form method="post" encType="multipart/form-data"
                        onSubmit={updateCategory}>
                        <div className="mb-3">
                          <label htmlFor="inputTitle" className="form-label">Title</label>
                          <input type="text" className="form-control" id="inputTitle" required
                            value={title} onChange={(event) => setTitle(event.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="inputPhoto" className="form-label">Photo</label>
                          <input type="file" className="form-control" id="inputPhoto" required onChange={(event) => setPhoto(event.target.files[0])} />

                        </div>
                        <div className="row mb-3">
                          <div className="col-6">
                            <b>Current Photo</b> <br />
                            <img src={getImgBase() + "category/" + oldphoto} className="img-fluid" height='200px' width='200px' />
                          </div>
                          <div className="col-6">
                            <label className="form-label">Is Live</label>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="isLive" id="yes" value='1' required
                                checked={islive === '1'} onChange={() => setIsLive('1')} />
                              <label className="form-check-label" htmlFor="yes">
                                Yes
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="isLive" id="no" value="0" required checked={islive === '0'}
                                onChange={() => setIsLive('0')} />
                              <label className="form-check-label" htmlFor="no">
                                No
                              </label>
                            </div>
                          </div>


                        </div>

                        <div className="text-end">
                          <button type="submit" className="btn btn-primary">Save changes</button>
                          <button type="reset" className="btn btn-secondary">Clear all</button>
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
