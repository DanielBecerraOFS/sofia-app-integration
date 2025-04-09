// src/features/ProcessMining/CompactProcessMiningView.stories.tsx

import { Meta, StoryObj } from '@storybook/react';
import { CompactProcessMining } from './CompactProcessMining';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import processMiningReducer from './store/processMiningSlice';
import timeUnitReducer from './store/timeUnitSlice';

const mockStore = configureStore({
  reducer: {
    processMining: processMiningReducer,
    timeUnit: timeUnitReducer,
  },
  preloadedState: {
    processMining: {
      metadata: {
        attributes: [
          { name: 'caseId', type: 'str' as const, distincts: ['case1', 'case2', 'case3'] },
          { name: 'activity', type: 'str' as const, distincts: ['start', 'process', 'end'] },
          { name: 'timestamp', type: 'date' as const, distincts: ['2023-01-01', '2023-01-02'] },
          { name: 'duration', type: 'number' as const, distincts: [10, 20, 30] }
        ]
      },
      rawData: null, // Required property added
      variants: null, // Required property added
      graphData: {
        nodes: [
          { id: 'node1', data: { label: 'Start' }, position: { x: 0, y: 0 } },
          { id: 'node2', data: { label: 'Process' }, position: { x: 100, y: 0 } },
          { id: 'node3', data: { label: 'End' }, position: { x: 200, y: 0 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2' },
          { id: 'edge2', source: 'node2', target: 'node3' }
        ],
        variants: [
          { id: 1, activities: 'Start > Process > End', percentage: 60, avg_time: 120, cases: '10' },
          { id: 2, activities: 'Start > End', percentage: 40, avg_time: 60, cases: '5' }
        ],
        activityAverages: {},  // Added to fix the error
        overallAverage: 0        // Added to fix the error
      },
      selectedFilter: {},
      loading: false,
      error: null
    },
    timeUnit: {
      unit: 'minutes' as const
    }
  }
});

// Decorator to wrap the component with the Redux Provider
const withReduxProvider = (Story: any) => (
  <Provider store={mockStore}>
    <div style={{ width: '100%', height: '100hv' }}>
      <Story />
    </div>
  </Provider>
);

const meta = {
  title: 'Process Mining/CompactProcessMiningView',
  component: CompactProcessMining,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# CompactProcessMiningView

The **CompactProcessMiningView** component is an advanced interface for visualizing and analyzing business processes. It allows users to explore process graphs, filter by attributes, analyze variants, and examine time and frequency metrics.

## Main Features

- **Process Visualization**: Displays an interactive graph of activities and connections.
- **Advanced Filtering**: Enables filtering by multiple attributes and values.
- **Variant Analysis**: Visualizes and allows selection of process variants.
- **Compact Mode**: Adaptable to different screen sizes.
- **Time Metrics**: Configurable in various time units.

## Usage

\`\`\`jsx
import { CompactProcessMiningView } from 'features/ProcessMining';

function ProcessPage() {
  return (
    <div style={{ width: '100%', height: '700px' }}>
      <CompactProcessMiningView />
    </div>
  );
}
\`\`\`

## Architecture

This component follows a modular approach with a clear separation of concerns:

1. **Main Component**: Orchestrates and coordinates subcomponents.
2. **Toolbar**: Controls for filters and settings.
3. **Filter Panel**: Advanced filter configuration.
4. **Variant Panel**: Selection and analysis of variants.
5. **Process Graph**: Visualization of the process graph.

## Dependencies

- React 18+
- Redux for state management
- ReactFlow for graph visualization
- Recharts for data charts
`
      }
    }
  },
  decorators: [withReduxProvider],
  argTypes: {},
} satisfies Meta<typeof CompactProcessMining>;

export default meta;
/**
 * @internal
 * Internal story interface
 */
type Story = StoryObj<typeof meta>;

// Main story
export const Default: Story = {
  args: {
    // No direct props are needed as Redux is used
  },
};

// Story variant with loading state
export const Loading: Story = {
  decorators: [
    (Story: any) => (
      <Provider store={configureStore({
        reducer: {
          processMining: processMiningReducer,
          timeUnit: timeUnitReducer,
        },
        preloadedState: {
          processMining: {
            metadata: null,
            rawData: null, // Added required property
            variants: null, // Added required property
            graphData: { 
              nodes: [], 
              edges: [], 
              variants: [],
              activityAverages: {},  // Added
              overallAverage: 0        // Added
            },
            selectedFilter: {},
            loading: true,
            error: null
          },
          timeUnit: { unit: 'minutes' as const }
        }
      })}>
        <div style={{ width: '100%', height: '600px' }}>
          <Story />
        </div>
      </Provider>
    )
  ]
};

// Story variant with error state
export const WithError: Story = {
  decorators: [
    (Story: any) => (
      <Provider store={configureStore({
        reducer: {
          processMining: processMiningReducer,
          timeUnit: timeUnitReducer,
        },
        preloadedState: {
          processMining: {
            metadata: null,
            rawData: null, // Added required property
            variants: null, // Added required property
            graphData: { 
              nodes: [], 
              edges: [], 
              variants: [],
              activityAverages: {},  // Added
              overallAverage: 0        // Added
            },
            selectedFilter: {},
            loading: false,
            error: "Error loading process data"
          },
          timeUnit: { unit: 'minutes' as const }
        }
      })}>
        <div style={{ width: '100%', height: '600px' }}>
          <Story />
        </div>
      </Provider>
    )
  ]
};

// Story variant with applied filters
export const WithFilters: Story = {
  decorators: [
    (Story: any) => (
      <Provider store={configureStore({
        reducer: {
          processMining: processMiningReducer,
          timeUnit: timeUnitReducer,
        },
        preloadedState: {
          processMining: {
            metadata: {
              attributes: [
                { name: 'caseId', type: 'str' as const, distincts: ['case1', 'case2', 'case3'] },
                { name: 'activity', type: 'str' as const, distincts: ['start', 'process', 'end'] },
                { name: 'timestamp', type: 'date' as const, distincts: ['2023-01-01', '2023-01-02'] },
                { name: 'duration', type: 'number' as const, distincts: [10, 20, 30] }
              ]
            },
            rawData: null, // Added required property
            variants: null, // Added required property
            graphData: {
              nodes: [
                { id: 'node1', data: { label: 'Start' }, position: { x: 0, y: 0 } },
                { id: 'node2', data: { label: 'Process' }, position: { x: 100, y: 0 } },
                { id: 'node3', data: { label: 'End' }, position: { x: 200, y: 0 } }
              ],
              edges: [
                { id: 'edge1', source: 'node1', target: 'node2' },
                { id: 'edge2', source: 'node2', target: 'node3' }
              ],
              variants: [
                { id: 1, activities: 'Start > Process > End', percentage: 60, avg_time: 120, cases: '10' },
                { id: 2, activities: 'Start > End', percentage: 40, avg_time: 60, cases: '5' }
              ],
              activityAverages: {},  // Added
              overallAverage: 0        // Added
            },
            selectedFilter: {
              caseId: ['case1'],
              activity: ['start', 'end']
            },
            loading: false,
            error: null
          },
          timeUnit: { unit: 'minutes' as const }
        }
      })}>
        <div style={{ width: '100%', height: '600px' }}>
          <Story />
        </div>
      </Provider>
    )
  ]
};
