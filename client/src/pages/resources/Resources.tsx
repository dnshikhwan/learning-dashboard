import { Link } from "react-router";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { IResource } from "../../interfaces/resource.interface";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ISkills } from "../../interfaces/skill.interface";

const Resources = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [filter, setFilter] = useState("");

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
    const fetchResources = async () => {
      try {
        const response = await axiosConfig.get("/resources");
        const resourcesData = response.data.details.data.resources;
        setResources(resourcesData);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchResources();
  }, []);

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

  const filteredResource = resources.filter((resource) => {
    return resource.skill_name === filter;
  });

  return (
    <>
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold text-gray-900">
                Resources
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of resources for your learning.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to={"/resources/add"}
                className="block rounded-md hover:cursor-pointer bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add resources
              </Link>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="flex items-end flex-col">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="filter"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Filter by
                </label>
                <div className=" grid grid-cols-1">
                  <select
                    id="filter"
                    name="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="All">All</option>
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.name}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        URL
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Skill
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
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
                    {filter === "All" || !filter
                      ? resources.map((resource) => (
                          <tr key={resource.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-blue-900 hover:underline sm:pl-0">
                              {resource.title}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {resource.url}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {resource.skill_name}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {resource.type.charAt(0).toUpperCase() +
                                resource.type.slice(1, resource.type.length)}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              <span
                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1  ring-inset ${getStatusBadgeClasses(
                                  resource.status
                                )}`}
                              >
                                {resource.status}
                              </span>
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500"></td>
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                              <Link
                                to={`/skills/edit/`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                                <span className="sr-only">
                                  , {resource.title}
                                </span>
                              </Link>
                            </td>
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                              <button className="text-red-600 hover:cursor-pointer hover:text-red-900">
                                Delete
                                <span className="sr-only">
                                  , {resource.title}
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))
                      : filteredResource.map((resource) => (
                          <tr key={resource.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-blue-900 hover:underline sm:pl-0">
                              {resource.title}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {resource.url}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {resource.skill_name}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {resource.type.charAt(0).toUpperCase() +
                                resource.type.slice(1, resource.type.length)}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              <span
                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1  ring-inset ${getStatusBadgeClasses(
                                  resource.status
                                )}`}
                              >
                                {resource.status}
                              </span>
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500"></td>
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                              <Link
                                to={`/skills/edit/`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                                <span className="sr-only">
                                  , {resource.title}
                                </span>
                              </Link>
                            </td>
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                              <button className="text-red-600 hover:cursor-pointer hover:text-red-900">
                                Delete
                                <span className="sr-only">
                                  , {resource.title}
                                </span>
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

export default Resources;
