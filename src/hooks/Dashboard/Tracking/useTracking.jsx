import { useSelector, useDispatch } from "react-redux";
import {
  fetchTrackingData,
  handlePageChange,
  handleFilterChange,
  setContracts,
  setLoading,
  setError,
  setPagination,
  setFilters,
} from "@/redux/features/trackingSlice";

/**
 * Custom hook for managing tracking state and actions.
 * Provides access to tracking state and dispatch functions.
 */
const useTracking = () => {
  const dispatch = useDispatch();
  const trackingState = useSelector((state) => state.tracking);

  /**
   * Dispatches the fetchTrackingData action.
   */
  const handleFetchTrackingData = () => dispatch(fetchTrackingData());

  /**
   * Dispatches the handlePageChange action.
   * @param {number} page - The page number to fetch.
   */
  const handlePageChangeDispatch = (page) => dispatch(handlePageChange(page));

  /**
   * Dispatches the handleFilterChange action.
   * @param {object} filters - The filters to apply.
   */
  const handleFilterChangeDispatch = (filters) =>
    dispatch(handleFilterChange(filters));

  return {
    ...trackingState,
    handleFetchTrackingData,
    handlePageChangeDispatch,
    handleFilterChangeDispatch,
    setContracts: (contracts) => dispatch(setContracts(contracts)),
    setLoading: (loading) => dispatch(setLoading(loading)),
    setError: (error) => dispatch(setError(error)),
    setPagination: (pagination) => dispatch(setPagination(pagination)),
    setFilters: (filters) => dispatch(setFilters(filters)),
  };
};

export default useTracking;
