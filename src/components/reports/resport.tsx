'use client';

import React, { useEffect, useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getReports } from '@/lib/features/reports/reportsThunk';

type ReportFilter = '1D' | '3D' | '7D' | 'CUSTOM';

const LogisticsReport = () => {
  const [filter, setFilter] = useState<ReportFilter>('1D');
  const [customDate, setCustomDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { productStats = [], clientSales = [], customerSales = [] } = useAppSelector((state) => state.reports.reports);

  useEffect(() => {
    const today = new Date();
    let compareDate = new Date(today);

    if (filter === '1D') {
      compareDate.setDate(today.getDate() - 1);
    } else if (filter === '3D') {
      compareDate.setDate(today.getDate() - 3);
    } else if (filter === '7D') {
      compareDate.setDate(today.getDate() - 7);
    } else if (filter === 'CUSTOM' && customDate) {
      compareDate = new Date(customDate);
    }

    setIsLoading(true);
    dispatch(getReports({ interval: compareDate.toISOString().slice(0, 19).replace('T', ' ') }))
      .finally(() => setIsLoading(false));
  }, [filter, customDate, dispatch]);

  const renderCard = (title: string, value: string | number, bg: string, text: string) => (
    <div className={`p-4 ${bg} rounded-xl text-center`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`text-lg font-semibold ${text}`}>{value}</p>
    </div>
  );

  const renderTable = (data: any[], columns: { label: string; key: string }[], title: string) => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-2 border">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="p-2 border">
                      {item[col.key] ?? '-'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Logistics Product Report</h2>

      {/* Filter Controls */}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {renderCard('Total Products', productStats.length, 'bg-blue-100', 'text-blue-700')}
        {renderCard('Client Sales', clientSales.length, 'bg-green-100', 'text-green-700')}
        {renderCard('Customer Sales', customerSales.length, 'bg-yellow-100', 'text-yellow-700')}
        {renderCard(
          'Total Remaining',
          productStats.reduce((sum, p) => sum + Number(p.totalRemaining || 0), 0),
          'bg-red-100',
          'text-red-700'
        )}
      </div>

      {/* Tables */}
      {renderTable(
        productStats,
        [
          { label: 'Product ID', key: 'productId' },
          { label: 'Name', key: 'productName' },
          { label: 'Remaining', key: 'totalRemaining' },
          { label: 'Sold', key: 'totalSold' },
        ],
        'Product Inventory Stats'
      )}

      {renderTable(
        clientSales,
        [
          { label: 'Product ID', key: 'productId' },
          { label: 'Name', key: 'productName' },
          { label: 'Remaining', key: 'remainingInStock' },
          { label: 'Sold', key: 'totalSold' },
          { label: 'Paid', key: 'totalPaid' },
        ],
        'Client Sales Summary'
      )}

      {renderTable(
        customerSales,
        [
          { label: 'Product ID', key: 'productId' },
          { label: 'Name', key: 'productName' },
          { label: 'Remaining', key: 'remainingInStock' },
          { label: 'Sold', key: 'totalSold' },
          { label: 'Paid', key: 'totalPaid' },
        ],
        'Customer Sales Summary'
      )}
    </div>
  );
};

export default LogisticsReport;
