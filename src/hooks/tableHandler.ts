import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSnackbar } from "@/components/common/SnakeBarProvider";
import { AsyncThunk } from "@reduxjs/toolkit";

/**
 * Generalized table hook to handle selection, actions, and data fetching.
 * @param fetchData - Redux thunk to fetch data (e.g., getProducts, getUsers, etc.).
 * @param deleteItem - Redux thunk to delete an item (e.g., deleteProducts, deleteUsers, etc.).
 * @param selectData - Selector function to get the data from Redux.
 * @param formatData - Optional function to format the data.
 */
export const useTableHandler = <T extends { id: number | string }>(
  fetchData: () => any,
  deleteItem: AsyncThunk<any, string, {}>,
  selectData: (state: any) => T[],
  formatData?: (data: T[]) => T[],
  editPath: string = ''
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const data = useAppSelector(selectData);
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, fetchData]);

  // Format data if needed
  const formattedData = useMemo(
    () => (formatData ? formatData(data) : data),
    [data, formatData]
  );

  // Select all rows
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data.map((row) => row.id)); // Select all IDs
    } else {
      setSelected([]);
    }
  };

  // Select individual row
  const handleSelectRow = (id: number | string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Edit item (navigates to a specific route)
  const handleEdit = (id: number | string) => {
    router.push(`${editPath}/${id}`);
  };

  // Delete item
  const handleDelete = (id: number | string) => {
    dispatch(deleteItem(id))
      .then((res) => {
        if (res.type.includes("/fulfilled")) {
          showSnackbar("Item deleted successfully!", "success");
          dispatch(fetchData()); // Re-fetch data
        } else {
          showSnackbar("Item deletion failed!", "error");
        }
      })
      .catch(() => showSnackbar("Item deletion failed!", "error"));
  };

  return {
    formattedData,
    selected,
    handleSelectAll,
    handleSelectRow,
    handleEdit,
    handleDelete,
  };
};
