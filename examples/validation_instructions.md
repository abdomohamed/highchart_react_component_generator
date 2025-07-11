# Running and Validating the Highcharts React Component

This guide will help you set up, run, and validate the React Highcharts component generated by an LLM.

## Prerequisites

Ensure you have the following installed:
- Node.js (v14+)
- npm or yarn

## Setup

1. Create a new React application (if you don't have one already):

```bash
npx create-react-app highcharts-demo --template typescript
cd highcharts-demo
```

2. Install the required dependencies:

```bash
npm install highcharts highcharts-react-official @highcharts/map-collection proj4
npm install @types/highcharts @types/proj4 --save-dev
```

3. Copy the generated component file (e.g., `GeoHeatmap.tsx`) to your `src` directory.

## Running the Component

1. Create a simple App component that uses your generated component:

```tsx
// src/App.tsx
import React from 'react';
import { GeoHeatmap } from './GeoHeatmap';

const App: React.FC = () => {
  const sampleData = [
    { lat: 51.5074, lon: -0.1278, value: 10 }, // London
    { lat: 40.7128, lon: -74.0060, value: 20 }, // New York
    { lat: 35.6762, lon: 139.6503, value: 30 }, // Tokyo
    { lat: -33.8688, lon: 151.2093, value: 25 }, // Sydney
    { lat: 19.4326, lon: -99.1332, value: 15 }, // Mexico City
  ];

  return (
    <div className="App">
      <h1>GeoHeatmap Visualization</h1>
      <GeoHeatmap
        data={sampleData}
        title="Global Sample Data"
        height="600px"
      />
    </div>
  );
};

export default App;
```

2. Run the application:

```bash
npm start
```

## Validating the Component

### Typescript Validation

Run the TypeScript compiler to check for type errors:

```bash
npx tsc --noEmit
```

### Functional Validation

1. **Basic Rendering**: Verify that the chart renders correctly with the sample data.
2. **Props Testing**: Try changing props to see if the chart updates properly:
   - Change data values
   - Change the title
   - Try different height/width values
   - Try custom color axis settings

3. **Error Handling**: Test with problematic data:
   - Empty data array
   - Data with missing values
   - Extreme coordinates or values

### Visual Validation

1. **Appearance Check**:
   - Is the map projection correct?
   - Do the colors represent the data values appropriately?
   - Are tooltips displaying correctly?

2. **Responsive Testing**:
   - Resize the browser window to test responsiveness
   - Try on different devices if possible

3. **Performance Testing**:
   - Try with a larger dataset (100+ points)
   - Check for any performance issues

### Browser Compatibility

Test the component in multiple browsers:
- Chrome
- Firefox
- Safari
- Edge

## Common Issues and Fixes

1. **Map doesn't display**: 
   - Check that map modules are properly imported
   - Verify GeoJSON data is loaded correctly

2. **TypeScript errors**:
   - Ensure proper type definitions are installed
   - Fix any interface mismatches

3. **Missing features**:
   - Compare implementation against Highcharts documentation
   - Add any missing options from the schema

4. **Memory leaks**:
   - Verify chart cleanup in useEffect's return function

## Advanced Validation

For more thorough testing, consider setting up:

1. **Unit Tests**: Using Jest and React Testing Library
2. **Integration Tests**: Testing the component in a full application
3. **Visual Regression Tests**: Using tools like Storybook and Chromatic
