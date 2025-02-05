import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { ISkills } from "../../interfaces/skill.interface";
import { Link, useParams } from "react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { differenceInDays, format } from "date-fns";
import { IResource } from "../../interfaces/resource.interface";
import { LinkIcon, MinusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { IGoal } from "../../interfaces/goal.interface";
import { IProgress } from "../../interfaces/progress.interface";

const Skill = () => {
  const [skill, setSkill] = useState<ISkills | undefined>();
  const [resources, setResources] = useState<IResource[]>([]);
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [progress, setProgress] = useState<IProgress[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axiosConfig.get(`/skills/${id}`);
        console.log(response.data);
        setSkill(response.data.details.data.skill);
        setResources(response.data.details.data.resources);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchSkill();
  }, [id]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axiosConfig.get(`/goals/${id}`);
        setGoals(response.data.details.data.goals);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };
    fetchGoals();
  }, [id]);

  const handleDeleteGoal = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.delete(`/goals/${id}`);
      console.log(response);
      setGoals(
        goals.filter((goal) => {
          return goal.id !== id;
        })
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err.response?.data);
      }
    }
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axiosConfig.get(`/progress/skill/${id}`);
        setProgress(response.data.details.data.progress);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
          setProgress([]);
        }
      }
    };

    fetchProgress();
  }, [id]);

  const handleDeleteProgress = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.delete(`/progress/${id}`);
      console.log(response.data);
      toast.success(response.data.message);
      setProgress(
        progress.filter((prog) => {
          return prog.id !== id;
        })
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err.response?.data);
      }
    }
  };

  const daysRemaining = skill?.target_date
    ? differenceInDays(new Date(skill.target_date), new Date())
    : null;

  return (
    <>
      <Layout>
        <div className="bg-white px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
            <p className="text-base/7 font-semibold text-indigo-600">Skill</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {skill?.name}
            </h1>
            <div className="mt-4 flex gap-2 items-center">
              <p className="text-base/8">
                Target date :{" "}
                {skill?.target_date
                  ? format(new Date(skill?.target_date), "dd/MM/yyyy")
                  : "-"}
              </p>
              {skill?.status !== "Completed" ? (
                <p className="bg-red-400 px-2 py-0.5 rounded-sm text-sm text-white">
                  {daysRemaining && daysRemaining > 0
                    ? `${daysRemaining} days left`
                    : "Due"}
                </p>
              ) : (
                <p className="bg-green-700 px-2 py-0.5 rounded-sm text-sm text-white">
                  Completed
                </p>
              )}
            </div>
            <p className="mt-6 text-xl/8">{skill?.description}</p>
            <div className="mt-10 max-w-2xl">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Goals</p>
                <Link to={"/goals/add"} className="text-indigo-600">
                  Add goal
                </Link>
              </div>
              <ul role="list" className="mt-2 max-w-xl space-y-8 text-gray-600">
                {goals.map((goal) => (
                  <li key={goal.id} className="flex gap-x-3">
                    <SparklesIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-yellow-600"
                    />
                    <span>
                      <strong
                        className={`font-semibold text-gray-900 ${
                          goal.status === "Completed" ? "line-through" : ""
                        }`}
                      >
                        {goal.description}
                      </strong>{" "}
                    </span>
                    <Link
                      className="text-indigo-600"
                      to={`/goals/edit/${goal.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:cursor-pointer"
                      onClick={(e) => handleDeleteGoal(e, goal.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 max-w-2xl">
              <div className="flex justify-between items-center	">
                <p className="font-semibold">Resources</p>
                <Link to={"/resources/add"} className="text-indigo-600">
                  Add resource
                </Link>
              </div>
              <ul role="list" className="mt-2 max-w-xl space-y-8 text-gray-600">
                {resources.map((resource) => (
                  <li key={resource.id} className="flex gap-x-3">
                    <LinkIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-indigo-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        {resource.title}
                      </strong>{" "}
                      <a
                        href={
                          resource.url.startsWith("http")
                            ? resource.url
                            : `https://${resource.url}`
                        }
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:underline"
                      >
                        {resource.url}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 max-w-2xl">
              <div className="flex justify-between items-center	">
                <p className="font-semibold">Progress logs</p>
                <Link
                  to={`/progress/add/${skill?.id}`}
                  className="text-indigo-600"
                >
                  Add progress log
                </Link>
              </div>
              <ul role="list" className="mt-2 max-w-xl space-y-8 text-gray-600">
                {progress.map((prog) => (
                  <li key={prog.id} className="flex-col gap-x-3">
                    <div className="flex gap-2">
                      <MinusIcon
                        aria-hidden="true"
                        className="mt-1 size-5 flex-none text-black"
                      />
                      <p className="text-gray-600">
                        {format(new Date(prog.date), "dd/MM/yyyy")}
                      </p>
                      <Link
                        to={`/progress/edit/${prog.id}`}
                        className="text-indigo-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => handleDeleteProgress(e, prog.id)}
                        className="text-red-600 hover:cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-indigo-600">
                      Time spent : {prog.time_spent} minutes
                    </p>
                    <span>
                      <strong className="font-semibold text-gray-900">
                        {prog.notes}
                      </strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Skill;
