'use client';

import { getReports } from '@/lib/features/reports/reportsThunk';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

type ReportFilter = '1D' | '3D' | '7D' | 'CUSTOM';

interface LogisticReport {
  id: string;
  date: Date;
  origin: string;
  destination: string;
  status: string;
  totalSales: number;
  cashIn: number;
  cashOut: number;
}

const dummyData: LogisticReport[] = [
  {
    id: 'SHIP123',
    date: new Date('2025-07-20'),
    origin: 'Karachi',
    destination: 'Lahore',
    status: 'Delivered',
    totalSales: 5000,
    cashIn: 3000,
    cashOut: 1500,
  },
  {
    id: 'SHIP124',
    date: new Date('2025-07-18'),
    origin: 'Islamabad',
    destination: 'Peshawar',
    status: 'In Transit',
    totalSales: 4000,
    cashIn: 2000,
    cashOut: 1000,
  },
];

const LogisticsReport = () => {
  const [filter, setFilter] = useState<ReportFilter>('1D');
  const [customDate, setCustomDate] = useState('');
  const [filteredData, setFilteredData] = useState<LogisticReport[]>([]);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.reports.reports);
  console.log('data',data)
  useEffect(() => {
    dispatch(getReports({ interval: new Date() }))
    const today = new Date();
    let compareDate = new Date();

    if (filter === '1D') {
      compareDate.setDate(today.getDate() - 1);
    } else if (filter === '3D') {
      compareDate.setDate(today.getDate() - 3);
    } else if (filter === '7D') {
      compareDate.setDate(today.getDate() - 7);
    } else if (filter === 'CUSTOM' && customDate) {
      compareDate = new Date(customDate);
    }

    const result = dummyData.filter(
      (item) => item.date > compareDate
    );
    setFilteredData(result);
  }, [filter, customDate]);

  const summary = filteredData.reduce(
    (acc, item) => {
      acc.totalSales += item.totalSales;
      acc.cashIn += item.cashIn;
      acc.cashOut += item.cashOut;
      return acc;
    },
    { totalSales: 0, cashIn: 0, cashOut: 0 }
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Logistics Report</h2>

      {/* Time Filter */}
      <div className="flex gap-4 items-center mb-6">
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as ReportFilter)}
          size="small"
        >
          <MenuItem value="1D">Last 1 Day</MenuItem>
          <MenuItem value="3D">Last 3 Days</MenuItem>
          <MenuItem value="7D">Last 7 Days</MenuItem>
          <MenuItem value="CUSTOM">Custom Date</MenuItem>
        </Select>

        {filter === 'CUSTOM' && (
          <TextField
            type="date"
            size="small"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
          />
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded-xl text-center">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-lg font-semibold">Rs {summary.totalSales}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-xl text-center">
          <p className="text-sm text-gray-600">Cash In</p>
          <p className="text-lg font-semibold text-green-700">
            Rs {summary.cashIn}
          </p>
        </div>
        <div className="p-4 bg-red-100 rounded-xl text-center">
          <p className="text-sm text-gray-600">Cash Out</p>
          <p className="text-lg font-semibold text-red-700">
            Rs {summary.cashOut}
          </p>
        </div>
        <div className="p-4 bg-blue-100 rounded-xl text-center">
          <p className="text-sm text-gray-600">Net Balance</p>
          <p className="text-lg font-semibold text-blue-700">
            Rs {summary.cashIn - summary.cashOut}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Shipment ID</th>
              <th className="p-2 border">Origin</th>
              <th className="p-2 border">Destination</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Sales</th>
              <th className="p-2 border">Cash In</th>
              <th className="p-2 border">Cash Out</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    {item.date.toISOString().slice(0, 10)}
                  </td>
                  <td className="p-2 border">{item.id}</td>
                  <td className="p-2 border">{item.origin}</td>
                  <td className="p-2 border">{item.destination}</td>
                  <td className="p-2 border">{item.status}</td>
                  <td className="p-2 border">Rs {item.totalSales}</td>
                  <td className="p-2 border">Rs {item.cashIn}</td>
                  <td className="p-2 border">Rs {item.cashOut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogisticsReport;
