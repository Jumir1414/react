import axios from "axios";
const usePost = () => {
  const postData = (url, data, msg) => {
    axios.post(url, data).then((res) => {
      alert(msg);
    });
  };
  return { postData };
};

export default usePost;
