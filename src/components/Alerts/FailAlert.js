import Swal from "sweetalert2";

export const FailAlert = (message) => {
    Swal.fire({
        icon:"error",
        text:message
    })
};
