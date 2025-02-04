import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ISkills } from "../../interfaces/skill.interface";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";

const resourceType = [
  { label: "Article", value: "article" },
  { label: "Video", value: "video" },
  { label: "Course", value: "course" },
];

const resourceStatus = [
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

const EditResource = () => {
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [skill_id, setSkillId] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axiosConfig.get(`/resources/${id}`);
        const resourceData = response.data.details.data.resource[0];
        const skillData = response.data.details.data.skill[0];
        setTitle(resourceData.title);
        setUrl(resourceData.url);
        setSkillId(skillData.name);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchResource();
  }, [id]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosConfig.get("/skills");
        const skillsData = response.data.details.data.skills;
        setSkills(skillsData);
        setSkillId(skillsData[0].id);
        setType(resourceType[0].value);
        setStatus(resourceStatus[0].value);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchSkills();
  }, []);

  const navigate = useNavigate();

  const handleEditResource = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        title,
        url,
        skill_id,
        type,
        status,
      };

      const response = await axiosConfig.put(`/resources/${id}`, data);
      console.log(response);
      toast.success(response.data.message);
      return navigate("/resources");
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
              Edit resource
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="name"
                    type="text"
                    required
                    autoComplete="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="url"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  URL
                </label>
                <div className="mt-2">
                  <input
                    id="url"
                    name="url"
                    required
                    type="url"
                    autoComplete="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="skill"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Skill
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="skill"
                    name="skill"
                    value={skill_id}
                    onChange={(e) => setSkillId(e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
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

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {resourceType.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
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
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {resourceStatus.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
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
                  onClick={handleEditResource}
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

export default EditResource;
