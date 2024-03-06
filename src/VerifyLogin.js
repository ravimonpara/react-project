import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function VerifyLogin() {
    let [cookies, setCookie, removeCookie] = useCookies(['theeasylearn']);
    let navigate = useNavigate();
    let SendToLogin = function () {
        useEffect(() => {
            navigate("/");
        });
    }
    console.log(cookies['id']);
    //check whether cookie exist or not 
    if (cookies['id'] === undefined) {
        SendToLogin();
    }
}