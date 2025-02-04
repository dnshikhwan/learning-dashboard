import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import {
  BookOpenIcon,
  CheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [learningSkillCount, setLearningSkillCount] = useState(0);
  const [completedSkillCount, setCompletedSkillCount] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  const stats = [
    {
      id: 1,
      name: "Time spent learning",
      stat: `${(totalTimeSpent / 60).toFixed(2)} hours`,
      icon: ClockIcon,
    },
    {
      id: 2,
      name: "Learning skills",
      stat: learningSkillCount,
      icon: BookOpenIcon,
    },
    {
      id: 3,
      name: "Completed skills",
      stat: completedSkillCount,
      icon: CheckIcon,
    },
  ];

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

  useEffect(() => {
    const fetchLearningSkills = async () => {
      try {
        const response = await axiosConfig.get("/skills/learning");
        setLearningSkillCount(response.data.details.data.skill.length);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchLearningSkills();
  });

  useEffect(() => {
    const fetchCompletedSkills = async () => {
      try {
        const response = await axiosConfig.get("/skills/completed");
        setCompletedSkillCount(response.data.details.data.skill.length);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchCompletedSkills();
  });

  useEffect(() => {
    const fetchTimeSpent = async () => {
      try {
        const response = await axiosConfig.get("/progress/time-spent");
        setTotalTimeSpent(response.data.details.data.total_time_spent);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchTimeSpent();
  });

  return (
    <>
      <Layout>
        <p>Welcome back, {username}</p>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-gray-900">
            Last 30 days
          </h3>

          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <item.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
