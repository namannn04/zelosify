import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/Axios/AxiosInstance';

/**
 * Async thunk to fetch utilization data
 *
 * @param {Object} params - Query parameters for the API call
 * @returns {Array} Utilization records
 */
export const fetchUtilizationData = createAsyncThunk(
  'utilization/fetchUtilizationData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/vendor/utilization', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch utilization data'
      );
    }
  }
);

/**
 * Async thunk to fetch filter options (vendors, contracts)
 */
export const fetchFilterOptions = createAsyncThunk(
  'utilization/fetchFilterOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/vendor/utilization/filters');
      return response.data;
    } catch (error) {
      // Fallback: Return default filter options if API doesn't exist
      console.warn('Filter options API not available, using defaults');
      return {
        vendors: ['Zelosify', 'TechStack', 'ByteWorks'],
        contracts: ['L1 Support', 'L2 Infra', 'Field Ops'],
        statuses: ['PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
      };
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  filterOptions: {
    vendors: [],
    contracts: [],
    statuses: ['PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
  },
  filters: {
    vendor: '',
    contract: '',
    status: '',
    search: '',
    page: 1,
    pageSize: 10,
  },
};

const utilizationSlice = createSlice({
  name: 'utilization',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetUtilization: () => initialState,
    setUtilizationFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUtilizationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUtilizationData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUtilizationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.filterOptions = {
          ...state.filterOptions,
          ...action.payload,
        };
      });
  },
});

export const {
  clearError,
  resetUtilization,
  setUtilizationFilters,
} = utilizationSlice.actions;

export const selectUtilizationData = (state) => state.utilization.data;
export const selectUtilizationLoading = (state) => state.utilization.isLoading;
export const selectUtilizationError = (state) => state.utilization.error;
export const selectUtilizationFilters = (state) => state.utilization.filters;
export const selectUtilizationFilterOptions = (state) => state.utilization.filterOptions;

export default utilizationSlice.reducer;

