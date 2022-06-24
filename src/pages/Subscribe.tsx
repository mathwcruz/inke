import { FormEvent, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import codeMockup from "../assets/code-mockup.png";
import inkeLogo from "../assets/inke-logo.svg";

import { Loading } from "../components/Loading";
import { validateEmailField } from "../utils/field-validator";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      name
    }
  }
`;

interface CreateSubscriberResponse {
  name: string;
}

type UserData = {
  name: string;
  email: string;
};

export const Subscribe = () => {
  const navigate = useNavigate();

  const [createSubscriber, { data, loading }] =
    useMutation<CreateSubscriberResponse>(CREATE_SUBSCRIBER_MUTATION);

  const [userData, setUserData] = useState<UserData>({} as UserData);

  const isAllFieldsFilled = useMemo(
    () => Object.values(userData)?.length === 2,
    [userData]
  );

  const handleSubscribe = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const isEmailValid = validateEmailField(userData?.email);

      if (!isEmailValid) {
        return toast.error("Email filled is invalid", {
          autoClose: 1800,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
        });
      }

      try {
        await createSubscriber({
          variables: {
            name: userData?.name,
            email: userData?.email,
          },
        });

        setUserData({} as UserData);

        toast.success(`${data?.name} you are registered to the event `, {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
        });

        navigate("/event");
      } catch (error) {
        toast.error("Error on submit to the event, try again", {
          autoClose: 1000,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    },
    [userData, createSubscriber, data]
  );

  return (
    <div className="min-h-screen px-5 bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="max-w-[1100px] w-full gap-4 flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <div className="flex flex-row gap-3 items-center">
            <img className="w-14" src={inkeLogo} alt="Inke Logo" />
            <h4 className="text-center font-bold text-4xl">Inke</h4>
          </div>
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build a{" "}
            <strong className="text-sky-400">complete application</strong> from
            scratch
          </h1>
          <span className="mt-4 text-neutral-400 leading-relaxed">
            In just one week you will master in practice one of the most used
            technologies and with high demand to access the best opportunities
            in the market.
          </span>
        </div>
        <div className="p-8 w-full bg-neutral-800 border border-neutral-600 rounded">
          {loading ? (
            <div className="flex items-center justify-center mb-4">
              <Loading iconSize={42} />
            </div>
          ) : (
            <>
              <strong className="text-2xl mb-6 block">
                Subscribe for free
              </strong>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-2 w-full"
              >
                <input
                  value={userData?.name}
                  onChange={(e) =>
                    setUserData((old) => ({ ...old, name: e.target.value }))
                  }
                  type="text"
                  placeholder="Your full name"
                  className="bg-neutral-900 focus:outline-none focus:border-rose-700 border transition-colors ease-in-out duration-200 border-transparent rounded px-5 h-14"
                />
                <input
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData((old) => ({ ...old, email: e.target.value }))
                  }
                  type="text"
                  placeholder="Type your email"
                  className="bg-neutral-900 focus:outline-none focus:border-rose-700 border transition-colors ease-in-out duration-200 border-transparent rounded px-5 h-14"
                />

                <button
                  type="submit"
                  disabled={!isAllFieldsFilled || loading}
                  title={!isAllFieldsFilled ? "Fill out the fields above" : ""}
                  className="mt-4 bg-rose-600 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-rose-600 uppercase py-4 rounded font-bold text-small hover:bg-rose-700 transition-colors duration-200"
                >
                  Guarantee my spot
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <img src={codeMockup} className="mt-10" alt="" />
    </div>
  );
};
