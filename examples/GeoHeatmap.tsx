import React, { useRef, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import geoheatmap from 'highcharts/modules/geoheatmap';
import proj4 from 'proj4';

// Initialize the required Highcharts modules
if (typeof Highcharts === 'object') {
  highchartsMap(Highcharts);
  geoheatmap(Highcharts);
  
  // Initialize proj4 for map projections
  if (typeof window !== 'undefined') {
    window.proj4 = proj4;
  }
}

// Define the props interface
export interface GeoHeatmapProps {
  data: Array<{
    lat: number;
    lon: number;
    value: number;
  }>;
  title: string;
  colorAxis?: {
    min?: number;
    max?: number;
    stops?: Array<[number, string]>;
  };
  mapData?: any; // GeoJSON map data
  height?: number | string;
  width?: number | string;
}

export const GeoHeatmap: React.FC<GeoHeatmapProps> = ({
  data,
  title,
  colorAxis,
  mapData,
  height = '400px',
  width = '100%',
}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  // Load default world map if not provided
  const [loadedMapData, setLoadedMapData] = useState<any>(mapData);
  
  useEffect(() => {
    if (!mapData) {
      // Fetch the default world map data if none provided
      import('@highcharts/map-collection/custom/world.geo.json')
        .then((worldMap) => {
          setLoadedMapData(worldMap.default);
        })
        .catch((error) => {
          console.error('Failed to load default world map:', error);
        });
    }
  }, [mapData]);

  // Update chart options when inputs change
  useEffect(() => {
    if (!loadedMapData || !data) return;

    // Transform data into the format expected by geoheatmap
    const transformedData = data.map(point => ({
      x: point.lon,
      y: point.lat,
      value: point.value
    }));

    // Configure the chart
    const options: Highcharts.Options = {
      chart: {
        map: loadedMapData,
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }
      },
      title: {
        text: title
      },
      mapView: {
        projection: {
          name: 'EqualEarth'
        }
      },
      colorAxis: colorAxis || {
        min: 0,
        max: Math.max(...data.map(d => d.value), 0),
        stops: [
          [0, '#EFEFFF'],
          [0.5, '#4444FF'],
          [1, '#000044']
        ]
      },
      legend: {
        enabled: true
      },
      tooltip: {
        pointFormat: '{point.value}'
      },
      series: [{
        type: 'geoheatmap',
        name: title,
        data: transformedData,
        colsize: 1,
        rowsize: 1,
        nullColor: 'rgba(200, 200, 200, 0.3)',
        tooltip: {
          headerFormat: '',
          pointFormat: 'Lat: {point.y}, Lon: {point.x}<br>Value: {point.value}'
        }
      }]
    };

    setChartOptions(options);
  }, [data, title, colorAxis, loadedMapData]);

  // Handle chart cleanup
  useEffect(() => {
    return () => {
      // Destroy the chart when the component unmounts
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, []);

  // Show loading state if map data isn't loaded yet
  if (!loadedMapData) {
    return <div data-testid="geoheatmap-container" style={{ height, width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Loading map data...
    </div>;
  }

  return (
    <div data-testid="geoheatmap-container" style={{ height, width }}>
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        constructorType={'mapChart'}
      />
    </div>
  );
};

// Usage example:
/*
import { GeoHeatmap } from './GeoHeatmap';

const App = () => {
  const sampleData = [
    { lat: 51.5074, lon: -0.1278, value: 10 }, // London
    { lat: 40.7128, lon: -74.0060, value: 20 }, // New York
    { lat: 35.6762, lon: 139.6503, value: 30 }, // Tokyo
    { lat: -33.8688, lon: 151.2093, value: 25 }, // Sydney
    { lat: 19.4326, lon: -99.1332, value: 15 }, // Mexico City
  ];

  return (
    <div className="App">
      <h1>GeoHeatmap Example</h1>
      <GeoHeatmap
        data={sampleData}
        title="Global Temperature Readings"
        height="600px"
      />
    </div>
  );
};
*/
