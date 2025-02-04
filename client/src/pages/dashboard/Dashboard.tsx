import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosConfig.get("/profile");
        localStorage.setItem(
          "current_user",
          JSON.stringify(response.data.details.data.user[0])
        );
        setUsername(response.data.details.data.user[0].username);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <>
      <Layout>
        <p>Welcome back, {username}</p>
      </Layout>
    </>
  );
};

export default Dashboard;
