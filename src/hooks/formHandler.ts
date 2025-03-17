import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import {
  ActionCreator,
  ActionCreatorWithPayload,
  AsyncThunk,
} from "@reduxjs/toolkit";
import { useSnackbar } from "@/components/common/SnakeBarProvider";

interface UseFormHandlerProps<T, K extends keyof T, V> {
  sliceKey: string; // Define which part of the state to manage
  submitAction: AsyncThunk<any, T, {}>; // Generic async thunk action for submission
  redirectPath: string; // Path to redirect after successful submission
  setFormState: ActionCreatorWithPayload<{ key: K; value: V }>; // Action creator to set form state
  getDataById?: AsyncThunk<any, string, {}>; // Optional async thunk action to fetch data by ID
  id?: string; // Optional ID for fetching data
  resetState?: ActionCreator<any>;
}

export const useFormHandler = <
  T extends Record<string, any>,
  K extends keyof T,
  V
>({
  sliceKey,
  submitAction,
  redirectPath,
  setFormState,
  getDataById,
  id,
  resetState = () => {},
}: UseFormHandlerProps<T, K, V>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const form = useAppSelector((state) => state[sliceKey]?.form || {}); // Access form dynamically
  const loading = useAppSelector((state) => state[sliceKey]?.loading);
  const error = useAppSelector((state) => state[sliceKey]?.error);
  const allState = useAppSelector((state) => state[sliceKey]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    let newValue: string | File = value;
    if (files && files.length > 0) {
      newValue = files[0]; // Handle file upload
    }

    dispatch(setFormState({ key: name as K, value: newValue as V }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form', form)
    dispatch(submitAction(form))
      .then((res) => {
        if (res.type.endsWith("/fulfilled")) {
          showSnackbar("Form submitted successfully!", "success");
          resetState();
          router.push("/dashboard/" + redirectPath);
        } else if (res.type.endsWith("/rejected")) {
          showSnackbar(error || "Submission failed!", "error");
        }
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
      });
  };
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset();
    dispatch(resetState());
  };
  useEffect(() => {
    if (id && id != "add" && getDataById) {
      dispatch(getDataById(id));
    }
  }, [id, getDataById, dispatch]);
  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleReset,
    dispatch,
    allState
  };
};
