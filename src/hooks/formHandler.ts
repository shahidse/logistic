import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { ActionCreatorWithPayload, AsyncThunk } from "@reduxjs/toolkit";
import { useSnackbar } from "@/components/common/SnakeBarProvider";

interface UseFormHandlerProps<T, K extends keyof T, V> {
  sliceKey: string; // Define which part of the state to manage
  submitAction: AsyncThunk<any, T, {}>; // Generic async thunk action for submission
  redirectPath: string; // Path to redirect after successful submission
  setFormState: ActionCreatorWithPayload<{ key: K; value: V }>; // Action creator to set form state
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
}: UseFormHandlerProps<T, K, V>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const form = useAppSelector((state) => state[sliceKey]?.form || {}); // Access form dynamically
  const loading = useAppSelector((state) => state[sliceKey]?.loading);
  const error = useAppSelector((state) => state[sliceKey]?.error);

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitAction(form))
      .then((res) => {
        if (res.type.endsWith("/fulfilled")) {
          showSnackbar("Form submitted successfully!", "success");
          router.push("/dashboard/" + redirectPath); // Customize redirect
        } else if (res.type.endsWith("/rejected")) {
          showSnackbar(error || "Submission failed!", "error");
        }
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
      });
  };

  return { form, loading, error, handleChange, handleSubmit };
};
