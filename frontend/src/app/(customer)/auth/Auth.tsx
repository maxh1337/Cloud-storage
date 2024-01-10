"use client";

import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Heading from "@/ui/Heading";
import Loader from "@/ui/Loader";
import Button from "@/ui/button/Button";

import { IEmailPassword } from "@/store/user/user.interface";

import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";

import Field from "@/ui/input/Field";
import { useAuthRedirect } from "./useAuthRedirect";
import { validEmail } from "./valid-email";

const Auth: FC = () => {
  useAuthRedirect();

  const { isLoading } = useAuth();

  const { login, register } = useActions();

  const [type, setType] = useState<"login" | "register">("login");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPassword>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
    if (type === "login") login(data);
    else register(data);

    reset();
  };

  return (
    <section className="flex h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-white shadow-sm p-10 px-14 m-auto flex-col flex"
      >
        <Heading className="capitalize text-center mb-4">{type}</Heading>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col">
              <Field
                {...formRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: validEmail,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Email"
                error={errors.email?.message}
              />
              <Field
                {...formRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min length should more 6 symbols",
                  },
                })}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
              />
              {type === "register" ? (
                <Field
                  {...formRegister("fio", {
                    required: "Фио is required",
                    minLength: {
                      value: 15,
                      message: "Min length should more 15 symbols",
                    },
                  })}
                  placeholder="Фио"
                  error={errors.fio?.message}
                />
              ) : null}
              <div className="text-center flex flex-col gap-3 content-center">
                <Button variant="blue" type="submit">
                  Authorize
                </Button>{" "}
                <Button
                  className=""
                  type="button"
                  variant="gray"
                  onClick={() =>
                    setType(type === "login" ? "register" : "login")
                  }
                >
                  Change to
                  {type === "login" ? " Register" : " Login"}
                </Button>{" "}
              </div>
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default Auth;
