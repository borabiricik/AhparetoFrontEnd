import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

export const AuthSuccessAlert = (message,history,url) => {
    Swal.fire({
        icon:"success",
        text:message
    }).then(r=>history.push(url))
};
