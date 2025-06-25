import React, { useState } from 'react';
import { GeoHeatmap } from './GeoHeatmap';

// Sample data sets
const SAMPLE_DATASETS = {
  globalTemperatures: [
    { lat: 51.5074, lon: -0.1278, value: 15 }, // London
    { lat: 40.7128, lon: -74.0060, value: 22 }, // New York
    { lat: 35.6762, lon: 139.6503, value: 25 }, // Tokyo
    { lat: -33.8688, lon: 151.2093, value: 28 }, // Sydney
    { lat: 19.4326, lon: -99.1332, value: 30 }, // Mexico City
    { lat: 55.7558, lon: 37.6173, value: 5 },   // Moscow
    { lat: -1.2921, lon: 36.8219, value: 29 },  // Nairobi
    { lat: 31.2304, lon: 121.4737, value: 27 }, // Shanghai
    { lat: -34.6037, lon: -58.3816, value: 23 }, // Buenos Aires
    { lat: 28.6139, lon: 77.2090, value: 33 },  // New Delhi
  ],
  populationDensity: [
    { lat: 51.5074, lon: -0.1278, value: 80 },  // London
    { lat: 40.7128, lon: -74.0060, value: 70 }, // New York
    { lat: 35.6762, lon: 139.6503, value: 95 }, // Tokyo
    { lat: -33.8688, lon: 151.2093, value: 40 }, // Sydney
    { lat: 19.4326, lon: -99.1332, value: 85 }, // Mexico City
    { lat: 55.7558, lon: 37.6173, value: 50 },  // Moscow
    { lat: -1.2921, lon: 36.8219, value: 65 },  // Nairobi
    { lat: 31.2304, lon: 121.4737, value: 90 }, // Shanghai
    { lat: -34.6037, lon: -58.3816, value: 75 }, // Buenos Aires
    { lat: 28.6139, lon: 77.2090, value: 100 }, // New Delhi
  ],
  internetUsage: [
    { lat: 51.5074, lon: -0.1278, value: 95 },  // London
    { lat: 40.7128, lon: -74.0060, value: 92 }, // New York
    { lat: 35.6762, lon: 139.6503, value: 90 }, // Tokyo
    { lat: -33.8688, lon: 151.2093, value: 88 }, // Sydney
    { lat: 19.4326, lon: -99.1332, value: 65 }, // Mexico City
    { lat: 55.7558, lon: 37.6173, value: 80 },  // Moscow
    { lat: -1.2921, lon: 36.8219, value: 40 },  // Nairobi
    { lat: 31.2304, lon: 121.4737, value: 70 }, // Shanghai
    { lat: -34.6037, lon: -58.3816, value: 75 }, // Buenos Aires
    { lat: 28.6139, lon: 77.2090, value: 45 },  // New Delhi
  ]
};

// Color schemes
const COLOR_SCHEMES = {
  temperature: {
    min: 0,
    max: 35,
    stops: [
      [0, '#0000FF'],      // Cold (blue)
      [0.5, '#FFFFFF'],    // Moderate (white)
      [1, '#FF0000']       // Hot (red)
    ]
  },
  population: {
    min: 0,
    max: 100,
    stops: [
      [0, '#EFEFFF'],      // Low (light blue)
      [0.5, '#4444FF'],    // Medium (blue)
      [1, '#000044']       // High (dark blue)
    ]
  },
  internet: {
    min: 0,
    max: 100,
    stops: [
      [0, '#FFFFCC'],      // Low (light yellow)
      [0.5, '#41B6C4'],    // Medium (teal)
      [1, '#253494']       // High (dark blue)
    ]
  }
};

const App: React.FC = () => {
  const [dataset, setDataset] = useState<'globalTemperatures' | 'populationDensity' | 'internetUsage'>('globalTemperatures');
  const [colorScheme, setColorScheme] = useState<'temperature' | 'population' | 'internet'>('temperature');
  
  // Map datasets to titles
  const dataTitles = {
    globalTemperatures: 'Global Temperatures (°C)',
    populationDensity: 'Population Density',
    internetUsage: 'Internet Usage (%)'
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>GeoHeatmap Visualization Demo</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div>
          <label htmlFor="dataset-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Dataset: </label>
          <select 
            id="dataset-select"
            value={dataset} 
            onChange={(e) => setDataset(e.target.value as any)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="globalTemperatures">Global Temperatures</option>
            <option value="populationDensity">Population Density</option>
            <option value="internetUsage">Internet Usage</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="color-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Color Scheme: </label>
          <select 
            id="color-select"
            value={colorScheme} 
            onChange={(e) => setColorScheme(e.target.value as any)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="temperature">Temperature Colors</option>
            <option value="population">Population Colors</option>
            <option value="internet">Internet Usage Colors</option>
          </select>
        </div>
      </div>
      
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <GeoHeatmap
          data={SAMPLE_DATASETS[dataset]}
          title={dataTitles[dataset]}
          colorAxis={COLOR_SCHEMES[colorScheme]}
          height="600px"
        />
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>About This Demo</h3>
        <p>
          This demo showcases the GeoHeatmap component's ability to visualize different types of geographical data.
          You can switch between datasets and color schemes to see how the visualization adapts.
        </p>
        <p>
          The GeoHeatmap component leverages Highcharts' geoheatmap series type to represent data points on a world map,
          with colors indicating the intensity of values at specific latitude and longitude coordinates.
        </p>
      </div>
    </div>
  );
};

export default App;
