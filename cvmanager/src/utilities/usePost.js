import axios from "axios";

import { toast } from "react-toastify";
const usePost = () => {
  const postData = (url, data, msg) => {
    axios
      .post(url, data)
      .then((res) => {
        toast(msg);
      })
      .catch((err) => toast.error(err));
  };
  return { postData };
};

export default usePost;
