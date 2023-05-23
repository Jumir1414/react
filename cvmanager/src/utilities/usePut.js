import axios from "axios";
const usePut = () => {
  const putData = (url, id, data, msg) => {
    axios.put(url + id, data).then((res) => {
      alert(msg);
    });
  };
  return { putData };
};

export default usePut;
