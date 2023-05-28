import axios from "axios";
import { toast } from "react-toastify";
const useDelete = () => {
  const deleteData = (url, msg) => {
    axios
      .delete(url)
      .catch((err) =>
        toast.warn(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "dark",
        })
      )
      .finally(() => toast(msg));
  };
  return { deleteData };
};

export default useDelete;
