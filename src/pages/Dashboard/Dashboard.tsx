import React from 'react';
import Layout from '../../layouts/Layout.tsx';
import Title from '../../components/Title/Title.tsx';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  MedicalDashboardProvider,
  useMedicalDashboard,
} from './DashboardContext.tsx';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  return (
    <MedicalDashboardProvider children={undefined}>
      <Body />
    </MedicalDashboardProvider>
  );
}

const Body = () => {
  const { barchartData, inventoryData } = useMedicalDashboard();

  // Bar Chart Data
  const barChartData = {
    labels: ['Odds', 'Evens'],
    datasets: [
      {
        label: 'Counts',
        data: barchartData,
        backgroundColor: 'rgba(133, 159, 61, 0.6)',
        borderColor: 'rgb(133, 159, 61)',
        borderWidth: 2,
        barThickness: 100,
      },
    ],
  };

  // Common Chart Options
  const commonChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: 'top' as const,
      },
    },
   
  };

  // Bar Chart Specific Options
  const barChartOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        display: true,
        text: 'THE COUNTS OF EVENs / ODDs IDs',
      },
    },
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: Object.keys(inventoryData),
    datasets: [
      {
        label: 'Medication Inventory',
        data: Object.values(inventoryData),
        backgroundColor: ['#3D5300', '#FFE31A ', '#F09319'],
        hoverOffset: 4,
      },
    ],
  };

  // Doughnut Chart Specific Options
  const doughnutOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        display: true,
        text: 'Medication Inventory Distribution',
      },
    },
  };

  return (
    <Layout>
      <Title title="Dashboard" />
      <div className="flex justify-around" style={{ height: '400px' }}>
        <Bar data={barChartData} options={barChartOptions} />
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
    </Layout>
  );
};
