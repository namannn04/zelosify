import { useSelector, useDispatch } from "react-redux";
import { useCallback, useRef } from "react";
import {
  fetchUtilizationData,
  fetchFilterOptions,
  clearError,
  resetUtilization,
  selectUtilizationData,
  selectUtilizationLoading,
  selectUtilizationError,
  selectUtilizationFilters,
  selectUtilizationFilterOptions,
  setUtilizationFilters,
} from "@/redux/features/Dashboard/utilizationSlice";

/**
 * custom hook for managing utilization state and operations
 *
 * @returns {Object} hook interface - state and handlers
 */
const useUtilization = () => {
  const dispatch = useDispatch();
  const hasFetchedRef = useRef(false);

  const data = useSelector(selectUtilizationData);
  const isLoading = useSelector(selectUtilizationLoading);
  const error = useSelector(selectUtilizationError);
  const filters = useSelector(selectUtilizationFilters);
  const filterOptions = useSelector(selectUtilizationFilterOptions);

  const handleFetchUtilizationData = useCallback(
    async (params = {}) => {
      if (hasFetchedRef.current && !params.forceRefresh) return;
      try {
        await dispatch(fetchUtilizationData(params)).unwrap();
        hasFetchedRef.current = true;
      } catch (err) {
        console.error("Failed to fetch utilization data:", err);
      }
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleResetUtilization = useCallback(() => {
    dispatch(resetUtilization());
    hasFetchedRef.current = false;
  }, [dispatch]);

  const handleSetFilters = useCallback(
    (newFilters) => {
      dispatch(setUtilizationFilters(newFilters));
    },
    [dispatch]
  );

  const handleFetchFilterOptions = useCallback(async () => {
    try {
      await dispatch(fetchFilterOptions()).unwrap();
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  }, [dispatch]);

  return {
    data,
    isLoading,
    error,
    filters,
    filterOptions,
    handleFetchUtilizationData,
    handleClearError,
    handleResetUtilization,
    handleSetFilters,
    handleFetchFilterOptions,
  };
};

export default useUtilization;
