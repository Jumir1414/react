import axios from "axios";
const useDelete = () => {
  const deleteData = (url, id, msg) => {
    axios.delete(url + id).then((res) => {
      alert(msg);
    });
  };
  return { deleteData };
};

export default useDelete;
