import Swal from "sweetalert2";

export const FireSwal = async ({ message, error, statusCode }) => {
  if (error) {
    await Swal.fire({
      text: message,
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      title: statusCode && "Error Code: " + statusCode,
    });
  } else {
    await Swal.fire({
      text: message,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};
