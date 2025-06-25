import React from 'react';
import { render, screen } from '@testing-library/react';
import { GeoHeatmap } from './GeoHeatmap'; // This would be your generated component

// Sample test data
const testData = [
  { lat: 51.5074, lon: -0.1278, value: 10 }, // London
  { lat: 40.7128, lon: -74.0060, value: 20 }, // New York
  { lat: 35.6762, lon: 139.6503, value: 30 }, // Tokyo
  { lat: -33.8688, lon: 151.2093, value: 25 }, // Sydney
  { lat: 19.4326, lon: -99.1332, value: 15 }, // Mexico City
];

describe('GeoHeatmap Component', () => {
  beforeAll(() => {
    // Mock Highcharts if needed
    // This is optional but can be helpful to isolate component logic from Highcharts rendering
    Object.defineProperty(window, 'Highcharts', {
      value: {
        charts: [],
        Chart: function() {
          this.reflow = jest.fn();
          this.destroy = jest.fn();
          window.Highcharts.charts.push(this);
          return this;
        },
        mapChart: function() {
          return new window.Highcharts.Chart();
        }
      },
      writable: true
    });
  });

  afterEach(() => {
    // Clean up after each test
    window.Highcharts.charts = [];
  });

  test('renders with required props', () => {
    render(<GeoHeatmap data={testData} title="Test GeoHeatmap" />);
    
    // Check that the component container is rendered
    const chartContainer = screen.getByTestId('geoheatmap-container');
    expect(chartContainer).toBeInTheDocument();
  });

  test('handles empty data', () => {
    render(<GeoHeatmap data={[]} title="Empty GeoHeatmap" />);
    
    // Should render without errors even with empty data
    const chartContainer = screen.getByTestId('geoheatmap-container');
    expect(chartContainer).toBeInTheDocument();
  });

  test('applies custom dimensions', () => {
    const customHeight = 500;
    const customWidth = 800;
    
    render(
      <GeoHeatmap 
        data={testData} 
        title="Custom Size GeoHeatmap" 
        height={customHeight}
        width={customWidth}
      />
    );
    
    const chartContainer = screen.getByTestId('geoheatmap-container');
    expect(chartContainer).toHaveStyle(`height: ${customHeight}px`);
    expect(chartContainer).toHaveStyle(`width: ${customWidth}px`);
  });

  // Additional tests would be added for:
  // - Testing prop changes
  // - Testing color axis configurations
  // - Testing custom map data
  // - Testing error states
});
