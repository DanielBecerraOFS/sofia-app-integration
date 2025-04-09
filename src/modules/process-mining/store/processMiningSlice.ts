import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  getProjectMetadata, 
  getDataByFilter, 
  getVariantsByActivities,
  DynamicFilter
} from "../services/processMiningApi";
import { aggregateProcessData } from "../services/processMiningTransform";

/**
 * Type of attribute that can be used in process mining
 * @typedef {'number' | 'str' | 'date'} AttributeType
 */
type AttributeType = 'number' | 'str' | 'date';

/**
 * Structure for project metadata attribute
 * @interface ProjectMetadataAttribute
 */
export interface ProjectMetadataAttribute {
  /** Name of the attribute */
  name: string;
  /** Type of the attribute (number, string, or date) */
  type: AttributeType;
  /** Array of distinct values for this attribute */
  distincts: any[];
}

/**
 * State structure for project metadata
 * @interface ProjectMetadataState
 */
export interface ProjectMetadataState {
  /** Available attributes in the project */
  attributes?: ProjectMetadataAttribute[];
}

/**
 * Structure for a row in the API result
 * @interface APIResultRow
 */
export interface APIResultRow {
  /** Unique identifier for the row */
  id: number;
  /** Case identifier */
  case: number;
  /** Timestamp of the activity */
  timestamp: string;
  /** Name of the activity */
  name: string;
  /** Time per task (in seconds) */
  tpt: number;
}

/**
 * Structure for API query results
 * @interface APIResult
 */
export interface APIResult {
  /** Total count of results */
  count: number;
  /** URL for next page of results */
  next: string | null;
  /** URL for previous page of results */
  previous: string | null;
  /** Array of result rows */
  results: APIResultRow[];
}

/**
 * Structure for a variant in the API result
 * @interface VariantAPIResultRow
 */
export interface VariantAPIResultRow {
  /** Unique identifier for the variant */
  id: number;
  /** Sequence of activities in this variant */
  activities: string;
  /** Comma-separated list of case IDs */
  cases: string;
  /** Percentage of cases that follow this variant */
  percentage: number;
  /** Average time for this variant (in seconds) */
  avg_time: number;
}

/**
 * Structure for variant API query results
 * @interface VariantAPIResult
 */
export interface VariantAPIResult {
  /** Total count of variants */
  count: number;
  /** URL for next page of results */
  next: string | null;
  /** URL for previous page of results */
  previous: string | null;
  /** Array of variant rows */
  results: VariantAPIResultRow[];
}

/**
 * Structure for KPI results
 * @interface KPIResult
 */
export interface KPIResult {
  /** Name of the KPI */
  name: string;
  /** Average time (in seconds) */
  avg_time: number;
  /** Number of cases (optional) */
  cases?: number;
  /** Number of occurrences (optional) */
  ocurrences?: number;
}

/**
 * Structure for process graph data
 * @interface ProcessGraphData
 */
export interface ProcessGraphData {
  /** Array of graph nodes */
  nodes: any[];
  /** Array of graph edges */
  edges: any[];
  /** Record of average times by activity */
  activityAverages: Record<string, number>;
  /** Overall average time for the process */
  overallAverage: number;
}

/**
 * State structure for process mining data
 * @interface ProcessMiningState
 */
interface ProcessMiningState {
  /** Project metadata information */
  metadata: ProjectMetadataState | null;
  /** Raw API data */
  rawData: APIResult | null;
  /** Process variants information */
  variants: VariantAPIResult | null;
  /** Processed graph data for visualization */
  graphData: ProcessGraphData & {
    /** Array of process variants */
    variants?: VariantAPIResultRow[];
  };
  /** Loading state indicator */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Currently selected filters */
  selectedFilter: DynamicFilter;
}

/**
 * Initial state for process mining
 */
const initialState: ProcessMiningState = {
  metadata: null,
  rawData: null,
  variants: null,
  graphData: { 
    nodes: [], 
    edges: [],
    activityAverages: {},
    overallAverage: 0
  },
  loading: false,
  error: null,
  selectedFilter: {},  // Dynamic empty filter
};

/**
 * Fetch project metadata from the API
 * @function fetchProjectMetadata
 * @returns {Promise<ProjectMetadataState>} Project metadata
 */
export const fetchProjectMetadata = createAsyncThunk(
  "processMining/fetchProjectMetadata",
  async (_, thunkAPI) => {
    try {
      return await getProjectMetadata();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Fetch filtered data and variants based on provided filters
 * @function fetchFilteredDataWithVariants
 * @param {DynamicFilter} filter - Filter criteria
 * @returns {Promise<{rawData: APIResult, variants: VariantAPIResult}>} Filtered data and variants
 */
export const fetchFilteredDataWithVariants = createAsyncThunk(
  "processMining/fetchFilteredDataWithVariants",
  async (filter: DynamicFilter, thunkAPI) => {
    try {
      const [rawData, variants] = await Promise.all([
        getDataByFilter(filter),
        getVariantsByActivities(filter)
      ]);
      
      return { 
        rawData: normalizeData(rawData),
        variants: normalizeData(variants)
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Helper function to normalize data into a standard format
 * @function normalizeData
 * @param {any} data - Data to normalize
 * @returns {APIResult | VariantAPIResult} Normalized data
 */
function normalizeData(data: any) {
  return Array.isArray(data) ? {
    count: data.length,
    results: data,
    next: null,
    previous: null
  } : data;
}

/**
 * Process mining slice for Redux store
 * @module processMiningSlice
 */
const processMiningSlice = createSlice({
  name: "processMining",
  initialState,
  reducers: {
    /**
     * Set filter values for a specific attribute
     * @function setFilterAttribute
     * @param {ProcessMiningState} state - Current state
     * @param {PayloadAction<{attribute: string, values: string[]}>} action - Filter values
     */
    setFilterAttribute: (
      state, 
      action: PayloadAction<{ attribute: string; values: string[] }>
    ) => {
      const { attribute, values } = action.payload;
      state.selectedFilter = {
        ...state.selectedFilter,
        [attribute]: values
      };
    },
    
    /**
     * Set selected cases (legacy support)
     * @function setSelectedCases
     * @param {ProcessMiningState} state - Current state
     * @param {PayloadAction<string[]>} action - Selected case IDs
     */
    setSelectedCases: (state, action: PayloadAction<string[]>) => {
      state.selectedFilter = {
        ...state.selectedFilter,
        case: action.payload
      };
    },
    
    /**
     * Set selected activities (legacy support)
     * @function setSelectedActivities
     * @param {ProcessMiningState} state - Current state
     * @param {PayloadAction<string[]>} action - Selected activity names
     */
    setSelectedActivities: (state, action: PayloadAction<string[]>) => {
      state.selectedFilter = {
        ...state.selectedFilter,
        name: action.payload
      };
    },
    
    /**
     * Update the entire filter object
     * @function updateSelectedFilters
     * @param {ProcessMiningState} state - Current state
     * @param {PayloadAction<DynamicFilter>} action - New filter object
     */
    updateSelectedFilters: (state, action: PayloadAction<DynamicFilter>) => {
      state.selectedFilter = action.payload;
    },
    
    /**
     * Clear all filters
     * @function clearFilters
     * @param {ProcessMiningState} state - Current state
     */
    clearFilters: (state) => {
      state.selectedFilter = {};
    },
    
    /**
     * Compute graph data from raw data
     * @function computeGraphData
     * @param {ProcessMiningState} state - Current state
     */
    computeGraphData: (state) => {
      if (state.rawData) {
        const processData = aggregateProcessData(state.rawData);
        state.graphData = {
          ...processData,
          variants: state.variants?.results || []
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMetadata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectMetadata.fulfilled, (state, action) => {
        state.metadata = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectMetadata.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchFilteredDataWithVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredDataWithVariants.fulfilled, (state, action) => {
        state.rawData = action.payload.rawData;
        state.variants = action.payload.variants;
        
        const processData = aggregateProcessData(action.payload.rawData);
        state.graphData = {
          ...processData,
          variants: action.payload.variants.results
        };
        
        state.loading = false;
      })
      .addCase(fetchFilteredDataWithVariants.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.rawData = null;
        state.variants = null;
        state.graphData = { 
          nodes: [], 
          edges: [],
          activityAverages: {},
          overallAverage: 0
        };
      });
  }
});

export const { 
  setFilterAttribute,
  setSelectedCases, 
  setSelectedActivities,
  updateSelectedFilters: setDynamicFilters,
  clearFilters, 
  computeGraphData
} = processMiningSlice.actions;

export default processMiningSlice.reducer;