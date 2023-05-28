import axios from "axios";
import { toast } from "react-toastify";
const usePut = () => {
  const putData = (url, id, data, msg) => {
    axios.put(url + id, data).then((res) => {
      toast(msg);
    });
  };
  return { putData };
};

export default usePut;
