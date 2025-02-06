import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { IReward } from "../../interfaces/reward.interface";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { axiosConfig } from "../../axiosConfig";
import { IUserReward } from "../../interfaces/user_reward.interface";
import { useNavigate } from "react-router";

const Reward = () => {
  const [reward, setReward] = useState<IReward[]>([]);
  const [claimedReward, setClaimedReward] = useState<IUserReward[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await axiosConfig.get("/rewards");
        setReward(response.data.details.data.rewards);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchReward();
  }, []);

  useEffect(() => {
    const fetchUserReward = async () => {
      try {
        const response = await axiosConfig.get("/rewards/claimed");
        setClaimedReward(response.data.details.data.userReward);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };
    fetchUserReward();
  }, []);

  const handleClaimReward = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.post(`/rewards/${id}`);
      toast.success(response.data.message);
      console.log(response.data);
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
      }
      toast.error("Not enough credits");
    }
  };

  return (
    <>
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-18 -mt-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">
            Claim your rewards
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {reward.map((reward) => (
              <div key={reward.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={reward.imagesrc}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {reward.name}
                    </h3>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {claimedReward.some(
                        (claim) => claim.reward_id === reward.id
                      )
                        ? "Claimed"
                        : `${reward.credit} credits`}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  {claimedReward.some(
                    (claim) => claim.reward_id === reward.id
                  ) ? (
                    <button className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                      Download
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleClaimReward(e, reward.id)}
                      className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Reward;
