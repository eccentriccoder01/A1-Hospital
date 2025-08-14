'use client'

import React, { useState, useEffect } from 'react'
import { PatientType } from '@/app/page'

// ✅ Move this above all state declarations
const overviewData = [
  {
    period: '2025-07-09',
    patientType: 'Cash Patient',
    gross: 2000.0,
    discount: 200.0,
    netAfterDiscount: 1800.0,
    patientShare: 100.0,
    netExcludingPatientShare: 1700.0,
  },
  {
    period: '2025-07-08',
    patientType: 'Insurance Patient',
    gross: 2500.0,
    discount: 300.0,
    netAfterDiscount: 2200.0,
    patientShare: 150.0,
    netExcludingPatientShare: 2050.0,
  },
  {
    period: '2025-07-07',
    patientType: 'Corporate',
    gross: 1800.0,
    discount: 150.0,
    netAfterDiscount: 1650.0,
    patientShare: 120.0,
    netExcludingPatientShare: 1530.0,
  },
]

const Overview: React.FC = () => {
  const [selectedPatientType, setSelectedPatientType] = useState<PatientType>('All')
  const [fromDate, setFromDate] = useState('2025-07-01')
  const [toDate, setToDate] = useState('2025-07-31')
  const [sortBy, setSortBy] = useState('revenue')
  const [filteredData, setFilteredData] = useState(overviewData)

  const patientTypes: PatientType[] = ['All', 'Cash Patient', 'Insurance Patient', 'Corporate', 'Charity', 'Other']

  const totals = {
    gross: 8500.0,
    discount: 900.0,
    netAfterDiscount: 7600.0,
    patientShare: 570.0,
    netExcludingPatientShare: 7030.0,
  }

  useEffect(() => {
    let filtered = [...overviewData]

    if (fromDate && toDate) {
      const from = new Date(fromDate)
      const to = new Date(toDate)
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.period)
        return entryDate >= from && entryDate <= to
      })
    }

    if (selectedPatientType !== 'All') {
      filtered = filtered.filter((entry) => entry.patientType === selectedPatientType)
    }

    if (sortBy === 'revenue') {
      filtered.sort((a, b) => b.netExcludingPatientShare - a.netExcludingPatientShare)
    } else if (sortBy === 'patients') {
      filtered.sort((a, b) => a.patientType.localeCompare(b.patientType))
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount)
    }

    setFilteredData(filtered)
  }, [fromDate, toDate, selectedPatientType, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mr-2">
            Filter by Patient Type:
          </label>
          <select
            value={selectedPatientType}
            onChange={(e) => setSelectedPatientType(e.target.value as PatientType)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {patientTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <label className="mr-2 text-sm text-gray-700">Sort by:</label>
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="revenue">Revenue</option>
          <option value="patients">Patients</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Apply Filter
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="text-sm">
              <div className="text-gray-600">Total Gross:</div>
              <div className="text-xl font-semibold text-gray-900">${totals.gross.toFixed(2)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-600">Total Discount:</div>
              <div className="text-xl font-semibold text-gray-900">${totals.discount.toFixed(2)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-600">Total Net (after Discount):</div>
              <div className="text-xl font-semibold text-gray-900">${totals.netAfterDiscount.toFixed(2)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-600">Total Patient Share:</div>
              <div className="text-xl font-semibold text-gray-900">${totals.patientShare.toFixed(2)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-600 font-semibold">Total Net (excluding Patient Share):</div>
              <div className="text-xl font-bold text-gray-900">${totals.netExcludingPatientShare.toFixed(2)}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-t border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Patient Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Gross ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Discount ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Net (after Discount) ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Patient Share ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Net (excluding Patient Share) ($)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{row.period}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{row.patientType}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{row.gross.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{row.discount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{row.netAfterDiscount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{row.patientShare.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">{row.netExcludingPatientShare.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
