import {toast} from 'react-toastify';
export default function showError(message)
{
    toast.error(message, {
      position: "bottom-center",
      hideProgressBar: false,
      autoClose: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  export  function showMessage(message)
{
    toast.success(message, {
      position: "bottom-center",
      hideProgressBar: true,
      autoClose: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };