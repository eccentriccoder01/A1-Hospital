'use client'

import React, { useState } from 'react'
import { Invoice, InvoiceDetail } from '@/app/page'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface InvoiceListProps {
  onViewInvoice: (invoice: InvoiceDetail) => void
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onViewInvoice }) => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('invoiceDate')

  const invoices: Invoice[] = [/* ...same invoices as before... */]

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortBy === 'grossAmount') return b.grossAmount - a.grossAmount
    if (sortBy === 'patientName') return a.patientName.localeCompare(b.patientName)
    return new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime()
  })

  const totals = sortedInvoices.reduce(
    (acc, invoice) => ({
      grossAmount: acc.grossAmount + invoice.grossAmount,
      discount: acc.discount + invoice.discount,
      patientShare: acc.patientShare + invoice.patientShare,
      taxAmount: acc.taxAmount + invoice.taxAmount,
      netBill: acc.netBill + invoice.netBill,
      invoiceDue: acc.invoiceDue + invoice.invoiceDue
    }),
    { grossAmount: 0, discount: 0, patientShare: 0, taxAmount: 0, netBill: 0, invoiceDue: 0 }
  )

  const handleExportCSV = () => {
    const csvContent = [
      ['Invoice No', 'Date', 'Patient', 'Doctor', 'Gross', 'Discount', 'Patient Share', 'Tax', 'Net', 'Due'],
      ...filteredInvoices.map(inv => [
        inv.invoiceNumber,
        inv.invoiceDate,
        inv.patientName,
        inv.doctor,
        inv.grossAmount,
        inv.discount,
        inv.patientShare,
        inv.taxAmount,
        inv.netBill,
        inv.invoiceDue
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'invoices.csv'
    link.click()
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.text('Invoice List', 14, 16)
    autoTable(doc, {
      head: [['Invoice No', 'Date', 'Patient', 'Doctor', 'Gross', 'Discount', 'Patient Share', 'Tax', 'Net', 'Due']],
      body: filteredInvoices.map(inv => [
        inv.invoiceNumber,
        inv.invoiceDate,
        inv.patientName,
        inv.doctor,
        inv.grossAmount,
        inv.discount,
        inv.patientShare,
        inv.taxAmount,
        inv.netBill,
        inv.invoiceDue
      ])
    })
    doc.save('invoices.pdf')
  }

  const generateInvoiceDetail = (invoice: Invoice): InvoiceDetail => ({
    invoiceNo: invoice.invoiceNumber,
    visitId: `V${invoice.id.padStart(6, '0')}`,
    date: invoice.invoiceDate,
    patientName: invoice.patientName,
    mobile: '+1 (555) 123-4567',
    address: '123 Main Street, Cityville, State, 123456',
    paymentMode: invoice.patientType === 'Insurance' ? 'Insurance' : 'Cash',
    items: [
      {
        code: 'CONS001',
        desc: 'Doctor Consultation',
        qty: 1,
        grossAmount: invoice.grossAmount * 0.4,
        discount: invoice.discount * 0.4,
        patientShare: invoice.patientShare * 0.4,
        taxAmount: invoice.taxAmount * 0.4,
        netBill: invoice.netBill * 0.4
      },
      {
        code: 'LAB001',
        desc: 'Laboratory Tests',
        qty: 3,
        grossAmount: invoice.grossAmount * 0.6,
        discount: invoice.discount * 0.6,
        patientShare: invoice.patientShare * 0.6,
        taxAmount: invoice.taxAmount * 0.6,
        netBill: invoice.netBill * 0.6
      }
    ],
    billedBy: invoice.billedBy,
    status: invoice.status,
    netTaxCollection: invoice.taxAmount,
    paymentMethod: invoice.patientType === 'Insurance' ? 'Insurance Claim' : 'Cash Payment',
    paymentTxnNumber: `TXN${Date.now()}`,
    amountInWords: `${invoice.netBill.toFixed(2)} Dollars Only`,
    forCenter: 'A1 Hospital Main Center'
  })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="filter-section no-print">
          <div className="filter-group">
            <div>
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-input"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-input"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="invoiceDate">Date</option>
                <option value="grossAmount">Gross Amount</option>
                <option value="patientName">Patient Name</option>
              </select>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button className="export-button pdf">Export PDF</button>
              <button className="export-button csv">Export CSV</button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            {/* ...same summary cards as before... */}
          </div>

          <div className="overflow-x-auto">
          <div className="flex justify-end space-x-2 mb-4">
            <button onClick={handleExportPDF} className="export-button pdf">Export PDF</button>
            <button onClick={handleExportCSV} className="export-button csv">Export CSV</button>
          </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th className="text-right">Gross ($)</th>
                  <th className="text-right">Discount ($)</th>
                  <th className="text-right">Patient Share ($)</th>
                  <th className="text-right">Tax ($)</th>
                  <th className="text-right">Net Bill ($)</th>
                  <th className="text-right">Due ($)</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.map(invoice => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewInvoice(generateInvoiceDetail(invoice))}
                  >
                    <td className="text-blue-600 hover:underline">{invoice.invoiceNumber}</td>
                    <td>{invoice.invoiceDate}</td>
                    <td>{invoice.patientName}</td>
                    <td>{invoice.doctor}</td>
                    <td className="text-right">{invoice.grossAmount.toFixed(2)}</td>
                    <td className="text-right">{invoice.discount.toFixed(2)}</td>
                    <td className="text-right">{invoice.patientShare.toFixed(2)}</td>
                    <td className="text-right">{invoice.taxAmount.toFixed(2)}</td>
                    <td className="text-right font-medium">{invoice.netBill.toFixed(2)}</td>
                    <td className="text-right">
                      <span className={invoice.invoiceDue > 0 ? 'text-red-600 font-medium' : ''}>
                        {invoice.invoiceDue.toFixed(2)}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {sortedInvoices.length > 0 && (
                  <tr className="total-row">
                    <td colSpan={4}>Total</td>
                    <td className="text-right">{totals.grossAmount.toFixed(2)}</td>
                    <td className="text-right">{totals.discount.toFixed(2)}</td>
                    <td className="text-right">{totals.patientShare.toFixed(2)}</td>
                    <td className="text-right">{totals.taxAmount.toFixed(2)}</td>
                    <td className="text-right font-bold">{totals.netBill.toFixed(2)}</td>
                    <td className="text-right font-bold">{totals.invoiceDue.toFixed(2)}</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {sortedInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No invoices found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceList
