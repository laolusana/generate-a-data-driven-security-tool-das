// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import axios from 'axios';

// Define the dashboard component
function Dashboard() {
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [threats, setThreats] = useState([]);
  const [vulns, setVulns] = useState([]);
  const [traffic, setTraffic] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    axios.get('/api/security-data')
      .then(response => {
        setData(response.data);
        setAlerts(response.data.alerts);
        setThreats(response.data.threats);
        setVulns(response.data.vulns);
        setTraffic(response.data.traffic);
      })
      .catch(error => console.error(error));
  }, []);

  // Define chart data and config
  const chartData = [
    { name: 'Jan', alerts: alerts.jan, threats: threats.jan, vulns: vulns.jan },
    { name: 'Feb', alerts: alerts.feb, threats: threats.feb, vulns: vulns.feb },
    { name: 'Mar', alerts: alerts.mar, threats: threats.mar, vulns: vulns.mar },
    { name: 'Apr', alerts: alerts.apr, threats: threats.apr, vulns: vulns.apr },
    { name: 'May', alerts: alerts.may, threats: threats.may, vulns: vulns.may },
    { name: 'Jun', alerts: alerts.jun, threats: threats.jun, vulns: vulns.jun },
    { name: 'Jul', alerts: alerts.jul, threats: threats.jul, vulns: vulns.jul },
    { name: 'Aug', alerts: alerts.aug, threats: threats.aug, vulns: vulns.aug },
    { name: 'Sep', alerts: alerts.sep, threats: threats.sep, vulns: vulns.sep },
    { name: 'Oct', alerts: alerts.oct, threats: threats.oct, vulns: vulns.oct },
    { name: 'Nov', alerts: alerts.nov, threats: threats.nov, vulns: vulns.nov },
    { name: 'Dec', alerts: alerts.dec, threats: threats.dec, vulns: vulns.dec },
  ];

  const chartConfig = {
    width: 500,
    height: 300,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 20,
    },
  };

  return (
    <div>
      <h1>Security Dashboard</h1>
      <BarChart width={chartConfig.width} height={chartConfig.height} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="alerts" fill="#FF6384" />
        <Bar dataKey="threats" fill="#36A2EB" />
        <Bar dataKey="vulns" fill="#FFCE56" />
      </BarChart>
      <LineChart width={chartConfig.width} height={chartConfig.height}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="traffic" stroke="#8884d8" />
      </LineChart>
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: 'Alerts',
            accessor: 'alerts',
          },
          {
            Header: 'Threats',
            accessor: 'threats',
          },
          {
            Header: 'Vulnerabilities',
            accessor: 'vulns',
          },
          {
            Header: 'Traffic',
            accessor: 'traffic',
          },
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
}

// Render the dashboard component
const App = () => {
  return <Dashboard />;
};

export default App;