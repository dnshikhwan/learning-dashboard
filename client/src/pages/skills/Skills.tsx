import { Link } from "react-router";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { ISkills } from "../../interfaces/skill.interface";

const Skills = () => {
  const [skills, setSkills] = useState<ISkills[]>([]);

  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "to do":
        return "bg-gray-50 text-gray-600 ring-1 ring-gray-500/10";
      case "in progress":
        return "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20";
      case "completed":
        return "bg-green-50 text-green-700 ring-1 ring-green-600/20";
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosConfig.get("/skills");
        const skillsData = response.data.details.data.skills;
        setSkills(skillsData);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchSkills();
  }, []);

  const handleDeleteSkill = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.delete(`/skills/${id}`);
      console.log(response);
      setSkills(
        skills.filter((item) => {
          return item.id !== id;
        })
      );
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
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold text-gray-900">Skills</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of skills that you want to learn.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to={"/skills/add"}
                className="block rounded-md hover:cursor-pointer bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add skills
              </Link>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Target Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {skills.map((skill) => (
                      <tr key={skill.id}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-blue-900 hover:underline sm:pl-0">
                          <Link to={`/skills/${skill.id}`}>{skill.name}</Link>
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {skill.description.length > 50
                            ? skill.description.substring(0, 50) + "..."
                            : skill.description}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {format(new Date(skill.target_date), "dd/MM/yyyy")}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1  ring-inset ${getStatusBadgeClasses(
                              skill.status
                            )}`}
                          >
                            {skill.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {format(new Date(skill.created_at), "dd/MM/yyyy")}
                        </td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                          <Link
                            to={`/skills/edit/${skill.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                            <span className="sr-only">, {skill.name}</span>
                          </Link>
                        </td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                          <button
                            onClick={(e) => handleDeleteSkill(e, skill.id)}
                            className="text-red-600 hover:cursor-pointer hover:text-red-900"
                          >
                            Delete
                            <span className="sr-only">, {skill.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Skills;
