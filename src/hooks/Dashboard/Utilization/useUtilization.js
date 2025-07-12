import { useSelector, useDispatch } from "react-redux";
import { useCallback, useRef, useEffect } from "react";
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
  const hasFetchedFiltersRef = useRef(false);

  const data = useSelector(selectUtilizationData);
  const isLoading = useSelector(selectUtilizationLoading);
  const error = useSelector(selectUtilizationError);
  const filters = useSelector(selectUtilizationFilters);
  const filterOptions = useSelector(selectUtilizationFilterOptions);

  const handleFetchUtilizationData = useCallback(
    async (params = {}) => {
      if (hasFetchedRef.current && !params.forceRefresh) {
        return;
      }
      
      try {
        const result = await dispatch(fetchUtilizationData(params)).unwrap();
        hasFetchedRef.current = true;
        return result;
      } catch (err) {
        console.error("Failed to fetch utilization data:", err);
        throw err;
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
    hasFetchedFiltersRef.current = false;
  }, [dispatch]);

  const handleSetFilters = useCallback(
    (newFilters) => {
      dispatch(setUtilizationFilters(newFilters));
    },
    [dispatch]
  );

  const handleFetchFilterOptions = useCallback(async () => {
    if (hasFetchedFiltersRef.current) {
      return;
    }
    
    try {
      const result = await dispatch(fetchFilterOptions()).unwrap();
      hasFetchedFiltersRef.current = true;
      return result;
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
      throw err;
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      hasFetchedRef.current = false;
      hasFetchedFiltersRef.current = false;
    };
  }, []);

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
