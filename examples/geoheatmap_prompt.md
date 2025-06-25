## GeoHeatmap React Component Implementation Request

Please create a React component for a Highcharts GeoHeatmap visualization with the following requirements:

### Component Requirements

1. Create a TypeScript React component named `GeoHeatmap` that renders a Highcharts geoheatmap visualization
2. Use the official `highcharts-react-official` package
3. Include proper TypeScript typings
4. Handle component cleanup to prevent memory leaks

### Props Interface

The component should accept these props:
- `data`: Array of data points with lat, lon, and value properties
- `title`: String for the chart title
- `colorAxis`: Optional configuration for the color scale
- `mapData`: GeoJSON data for the map (default to world map)
- `height`: Optional height for the chart container
- `width`: Optional width for the chart container

### Highcharts Configuration

According to the schema, a geoheatmap has these key configuration options:
```json
{
  "borderWidth": {},
  "color": {},
  "colsize": {},
  "interpolation": {},
  "nullColor": {},
  "rowsize": {},
  "stickyTracking": {},
  "tooltip": {}
}
```

The chart type should be set to 'geoheatmap' and requires the 'module:modules/geoheatmap' module.

### Example Data Structure

```typescript
interface GeoHeatmapPoint {
  lat: number;
  lon: number;
  value: number;
}

const sampleData: GeoHeatmapPoint[] = [
  { lat: 51.5074, lon: -0.1278, value: 10 }, // London
  { lat: 40.7128, lon: -74.0060, value: 20 }, // New York
  { lat: 35.6762, lon: 139.6503, value: 30 }, // Tokyo
  // more data points...
];
```

### Additional Requirements

1. Include proper error handling for missing data or map projection issues
2. Add responsive configuration to handle different screen sizes
3. Include comments explaining key parts of the implementation
4. Provide a small usage example showing how to use the component

### Reference Documentation

Based on the Highcharts documentation, geoheatmap is a variety of heatmap series composed into a map projection, where the units are expressed in latitude and longitude, and individual values in a matrix are represented as colors.
