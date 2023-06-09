"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Form, Field } from "houseform";
import { z } from "zod";

interface FormValues {
  title: string;
}

export default function Page() {
  const onSubmitHandler = useCallback(async (values: FormValues) => {
    console.log(values);
  }, []);

  return (
    <div className="max-w-xs space-y-6">
      <Link href=".." className="btn btn-ghost">
        Go back
      </Link>

      <Form<FormValues> onSubmit={onSubmitHandler}>
        {({ submit }) => (
          <div className="space-y-4">
            <Field<FormValues["title"]>
              name="title"
              onBlurValidate={z.string().min(3)}
            >
              {({ value, setValue, onBlur, errors }) => (
                <div>
                  <label className="label">
                    <span className="label-text">Task title</span>
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Type here..."
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    {errors.map((error, index) => (
                      <span key={index} className="label-text-alt">
                        {error}
                      </span>
                    ))}
                  </label>
                </div>
              )}
            </Field>

            <button className="btn btn-block" onClick={submit}>
              Submit
            </button>
          </div>
        )}
      </Form>
    </div>
  );
}
