import { useSelector, useDispatch } from "react-redux";
import {
  fetchRequests,
  approveRequest,
  rejectRequest,
  getAIRecommendation,
  changePage,
  changeFilters,
} from "@/redux/features/requestSlice";

/**
 * Custom hook for managing requests state and actions.
 * Provides access to requests state and dispatch functions.
 */
const useRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading, error, pagination, filters } = useSelector(
    (state) => state.requests
  );

  /**
   * Dispatches the fetchRequests action.
   */
  const handleFetchRequests = () => dispatch(fetchRequests());

  /**
   * Dispatches the approveRequest action.
   * @param {number} id - The ID of the request to approve.
   */
  const handleApproveRequest = async (id) => {
    await dispatch(approveRequest(id));
    handleFetchRequests();
  };

  /**
   * Dispatches the rejectRequest action.
   * @param {number} id - The ID of the request to reject.
   */
  const handleRejectRequest = async (id) => {
    await dispatch(rejectRequest(id));
    handleFetchRequests();
  };

  /**
   * Dispatches the getAIRecommendation action.
   * @param {number} id - The ID of the request to get AI recommendation for.
   * @returns {string} - The AI recommendation.
   */
  const handleGetAIRecommendation = async (id) => {
    const response = await dispatch(getAIRecommendation(id));
    return response.payload.aiRecommendation;
  };

  /**
   * Dispatches the changePage action.
   * @param {number} page - The page number to fetch.
   */
  const handleChangePage = (page) => {
    dispatch(changePage(page));
    handleFetchRequests();
  };

  /**
   * Dispatches the changeFilters action.
   * @param {object} newFilters - The filters to apply.
   */
  const handleChangeFilters = (newFilters) =>
    dispatch(changeFilters(newFilters));

  return {
    requests,
    loading,
    error,
    pagination,
    filters,
    handleFetchRequests,
    handleApproveRequest,
    handleRejectRequest,
    handleGetAIRecommendation,
    handleChangePage,
    handleChangeFilters,
  };
};

export default useRequests;
