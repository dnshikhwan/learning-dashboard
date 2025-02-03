import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import { axiosConfig } from "../../axiosConfig";
import { useNavigate, useParams } from "react-router";
import { ISkills } from "../../interfaces/skill.interface";
import { format } from "date-fns";

const status = [
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

const EditSkill = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [skillStatus, setSkillStatus] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axiosConfig.get(`/skills/${id}`);
        const skillData = response.data.details.data.skill as ISkills;
        setName(skillData.name);
        setDescription(skillData.description);
        setTargetDate(format(new Date(skillData.target_date), "yyyy-MM-dd"));
        setSkillStatus(skillData.status);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchSkill();
  }, [id]);

  const handleEditSkill = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        name,
        description,
        target_date: targetDate,
        status: skillStatus,
      };

      const response = await axiosConfig.put(`/skills/${id}`, data);
      console.log(response.data.details.data);
      toast.success(response.data.message);
      return navigate("/skills");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err.response?.data);
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Edit skill
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    required
                    autoComplete="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="target_date"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Target Date
                </label>
                <div className="mt-2">
                  <input
                    id="target_date"
                    name="target_date"
                    type="date"
                    required
                    autoComplete="target_date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Status
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="status"
                    name="status"
                    value={skillStatus}
                    onChange={(e) => setSkillStatus(e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {status.map((stat) => (
                      <option key={stat.value} value={stat.value}>
                        {stat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleEditSkill}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditSkill;
