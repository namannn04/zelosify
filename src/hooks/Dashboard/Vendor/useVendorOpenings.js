import { useState } from "react";
import axiosInstance from "@/utils/Axios/AxiosInstance";

const useVendorOpenings = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const handleFetchOpenings = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get(`/vendor/openings?page=${page}`);
      const data = response.data;
      setOpenings(Array.isArray(data.openings) ? data.openings : []);
      setPagination(data.pagination || null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch openings');
      console.error('Error fetching openings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getOpeningById = async (openingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get(`/vendor/openings/${openingId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch opening details');
      console.error('Error fetching opening details:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const presignUploads = async (openingId, filenames) => {
    try {
      const response = await axiosInstance.post(`/vendor/openings/${openingId}/profiles/presign`, {
        filenames
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to get presigned URLs');
      console.error('Error getting presigned URLs:', err);
      throw err;
    }
  };

  const submitProfiles = async (openingId, uploadedFiles) => {
    try {
      const response = await axiosInstance.patch(`/vendor/openings/${openingId}/profiles`, {
        uploadedFiles
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit profiles');
      console.error('Error submitting profiles:', err);
      throw err;
    }
  };

  const handleChangePage = (page) => {
    handleFetchOpenings(page);
  };

  return {
    openings,
    loading,
    error,
    pagination,
    handleFetchOpenings,
    getOpeningById,
    presignUploads,
    submitProfiles,
    handleChangePage,
  };
};

export default useVendorOpenings; 