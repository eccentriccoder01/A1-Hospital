'use client'

import React, { useState, useEffect } from 'react'
import { Patient, PatientType } from '@/app/page'

const PatientWise: React.FC = () => {
  const [selectedPatientType, setSelectedPatientType] = useState<PatientType>('All')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const patientTypes: PatientType[] = ['All', 'Cash Patient', 'Insurance Patient', 'Corporate', 'Charity', 'Other']
  const [sortBy, setSortBy] = useState('name')
  const [sortedPatients, setSortedPatients] = useState<Patient[]>([])

  const patients: Patient[] = [
    {
      id: 'P001',
      name: 'John Doe',
      invoiceDate: '17/07/2025',
      invoiceNumber: 'INV-072096',
      patientType: 'Insurance Patient',
      doctor: 'Dr. Smith',
      gross: 2500.00,
      discount: 300.00,
      net: 2200.00
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      invoiceDate: '13/07/2025',
      invoiceNumber: 'INV-071002',
      patientType: 'Cash Patient',
      doctor: 'Dr. Adams',
      gross: 2000.00,
      discount: 200.00,
      net: 1800.00
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      invoiceDate: '15/07/2025',
      invoiceNumber: 'INV-071500',
      patientType: 'Corporate',
      doctor: 'Dr. Wilson',
      gross: 1800.00,
      discount: 150.00,
      net: 1650.00
    },
    {
      id: 'P004',
      name: 'Mary Davis',
      invoiceDate: '20/07/2025',
      invoiceNumber: 'INV-072001',
      patientType: 'Insurance Patient',
      doctor: 'Dr. Brown',
      gross: 3200.00,
      discount: 400.00,
      net: 2800.00
    },
    {
      id: 'P005',
      name: 'Michael Wilson',
      invoiceDate: '22/07/2025',
      invoiceNumber: 'INV-072201',
      patientType: 'Cash Patient',
      doctor: 'Dr. Taylor',
      gross: 1500.00,
      discount: 100.00,
      net: 1400.00
    }
  ]

  const filteredPatients = patients.filter(patient => {
    const matchType = selectedPatientType === 'All' || patient.patientType === selectedPatientType
    const matchFrom = fromDate ? new Date(patient.invoiceDate.split('/').reverse().join('-')) >= new Date(fromDate) : true
    const matchTo = toDate ? new Date(patient.invoiceDate.split('/').reverse().join('-')) <= new Date(toDate) : true
    return matchType && matchFrom && matchTo
  })

  const totals = filteredPatients.reduce(
    (acc, patient) => ({
      gross: acc.gross + patient.gross,
      discount: acc.discount + patient.discount,
      net: acc.net + patient.net
    }),
    { gross: 0, discount: 0, net: 0 }
  )

  useEffect(() => {
    let sorted = [...filteredPatients] 
    if (sortBy === 'net-high') {
      sorted.sort((a, b) => b.net - a.net)
    } else if (sortBy === 'net-low') {
      sorted.sort((a, b) => a.net - b.net)
    } else {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }
    setSortedPatients(sorted)
  }, [sortBy, filteredPatients])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Patient-Wise Breakdown</h2>
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
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Apply Filter
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <label className="form-label">Sort by:</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Patient Name</option>
            <option value="net-high">Net Bill: High to Low</option>
            <option value="net-low">Net Bill: Low to High</option>
          </select>
        </div>

        <div className="p-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-sm">
              <div className="text-gray-600">Total Gross:</div>
              <div className="text-xl font-semibold text-gray-900">${totals.gross.toFixed(2)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-600">Total Discount:</div>
              <div className="text-xl font-semibold text-gray-900">${totals.discount.toFixed(2)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-600">Total Net:</div>
              <div className="text-xl font-semibold text-gray-900">${totals.net.toFixed(2)}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Patient ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Patient Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Doctor</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Gross ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Discount ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Net ($)</th>
                </tr>
              </thead>
              <tbody>
                {sortedPatients.map((patient, index) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{patient.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{patient.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{patient.invoiceDate}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{patient.invoiceNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        patient.patientType === 'Cash Patient' 
                          ? 'bg-green-100 text-green-800'
                          : patient.patientType === 'Insurance Patient'
                          ? 'bg-blue-100 text-blue-800'
                          : patient.patientType === 'Corporate'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.patientType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{patient.doctor}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{patient.gross.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{patient.discount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">{patient.net.toFixed(2)}</td>
                  </tr>
                ))}
                {filteredPatients.length > 0 && (
                  <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900" colSpan={6}>Total</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{totals.gross.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">{totals.discount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-bold">{totals.net.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No patients found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientWise