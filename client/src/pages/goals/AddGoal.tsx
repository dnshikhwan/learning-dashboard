import { AxiosError } from "axios";
import { axiosConfig } from "../../axiosConfig";
import Layout from "../../components/Layout";
import { ISkills } from "../../interfaces/skill.interface";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const goalStatus = [
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

const AddGoal = () => {
  const [skills, setSkills] = useState<ISkills[]>([]);

  const [description, setDescription] = useState("");
  const [skillId, setSkillId] = useState("");
  const [status, setStatus] = useState("");
  const [target_date, setTargetDate] = useState("");

  const navigate = useNavigate();

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        description,
        skill_id: skillId,
        status,
        target_date,
      };

      console.log(data);

      const response = await axiosConfig.post("/goals", data);
      console.log(response);
      toast.success(response.data.message);
      return navigate(`/skills/${skillId}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err.response?.data);
      }
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosConfig.get("/skills");
        const skillsData = response.data.details.data.skills;
        setSkills(skillsData);
        setSkillId(skillsData[0].id);
        setStatus(goalStatus[0].value);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchSkills();
  }, []);
  return (
    <>
      <Layout>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Add new goal
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
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
                  htmlFor="skill"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Skill
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="skill"
                    name="skill"
                    value={skillId}
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
                    {goalStatus.map((status) => (
                      <option value={status.value} key={status.value}>
                        {status.label}
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
                    value={target_date}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleAddGoal}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddGoal;
