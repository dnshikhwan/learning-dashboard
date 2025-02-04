import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { ISkills } from "../../interfaces/skill.interface";
import { useParams } from "react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { differenceInDays, format } from "date-fns";
import { IResource } from "../../interfaces/resource.interface";
import { LinkIcon } from "@heroicons/react/24/outline";

const Skill = () => {
  const [skill, setSkill] = useState<ISkills | undefined>();
  const [resources, setResources] = useState<IResource[]>([]);
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
              <p className="font-semibold">Resources</p>
              <ul role="list" className="mt-2 max-w-xl space-y-8 text-gray-600">
                {resources.map((resource) => (
                  <li className="flex gap-x-3">
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Skill;
