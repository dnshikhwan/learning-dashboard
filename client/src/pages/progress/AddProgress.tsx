import { useState } from "react";
import Layout from "../../components/Layout";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { axiosConfig } from "../../axiosConfig";

const AddProgress = () => {
  const [date, setDate] = useState("");
  const [time_spent, setTimeSpent] = useState("");
  const [notes, setNotes] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddProgress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        date,
        time_spent,
        skill_id: id,
        notes,
      };

      const response = await axiosConfig.post("/progress", data);
      console.log(response.data);
      return navigate(-1);
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
              Add new progress
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    autoComplete="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="time_spent"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Time spent (in minutes)
                </label>
                <div className="mt-2">
                  <input
                    id="time_spent"
                    name="time_spent"
                    type="number"
                    required
                    autoComplete="time_spent"
                    value={time_spent}
                    onChange={(e) => setTimeSpent(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Notes
                </label>
                <div className="mt-2">
                  <textarea
                    id="notes"
                    name="notes"
                    required
                    autoComplete="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleAddProgress}
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

export default AddProgress;
