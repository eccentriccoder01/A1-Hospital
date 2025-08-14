'use client'

import React from 'react'
import { InvoiceDetail } from '@/app/page'

interface InvoiceViewProps {
  invoice: InvoiceDetail
  onBack: () => void
}

const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice, onBack }) => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Invoice List</span>
        </button>
      <div className="flex justify-end no-print mb-4">
        <button
          onClick={() => window.print()}
          className="export-button pdf"
        >
          Print Invoice
        </button>
      </div>
      </div>

      {/* Invoice Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-8">
          {/* Invoice Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">A1 HOSPITAL</h1>
            <p className="text-gray-600 mb-1">123 Main Street, Cityville, State, 123456</p>
            <p className="text-gray-600 mb-1">Contact: +1 (555) 123-4567 | Website: www.A1hospital.com</p>
            <p className="text-gray-600">Appointment Line: +1 (555) 000-1234</p>
            <div className="mt-4 pt-4 border-t">
              <h2 className="text-xl font-semibold text-gray-900">INVOICE</h2>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Information</h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 text-gray-600">Invoice No:</span>
                  <span className="font-medium text-gray-900">{invoice.invoiceNo}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Visit ID:</span>
                  <span className="font-medium text-gray-900">{invoice.visitId}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{invoice.date}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{invoice.patientName}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Mobile:</span>
                  <span className="font-medium text-gray-900">{invoice.mobile}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Address:</span>
                  <span className="font-medium text-gray-900">{invoice.address}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Payment Mode:</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.paymentMode === 'Insurance' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {invoice.paymentMode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Code</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Qty</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-900">Gross Amount ($)</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-900">Discount ($)</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-900">Patient Share ($)</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-900">Tax Amount ($)</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-900">Net Bill ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">{item.code}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">{item.desc}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-center">{item.qty}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">{item.grossAmount.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">{item.discount.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">{item.patientShare.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">{item.taxAmount.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right font-medium">{item.netBill.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900" colSpan={3}>Total</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">
                      {invoice.items.reduce((sum, item) => sum + item.grossAmount, 0).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">
                      {invoice.items.reduce((sum, item) => sum + item.discount, 0).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">
                      {invoice.items.reduce((sum, item) => sum + item.patientShare, 0).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right">
                      {invoice.items.reduce((sum, item) => sum + item.taxAmount, 0).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 text-right font-bold">
                      {invoice.items.reduce((sum, item) => sum + item.netBill, 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-40 text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">{invoice.paymentMethod}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Transaction Number:</span>
                  <span className="font-medium text-gray-900">{invoice.paymentTxnNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Net Tax Collection:</span>
                  <span className="font-medium text-gray-900">${invoice.netTaxCollection.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amount Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium text-gray-900">
                      ${invoice.items.reduce((sum, item) => sum + item.netBill, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Amount in Words:</span>
                  </div>
                  <div className="text-sm text-gray-700 italic">
                    {invoice.amountInWords}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t">
            <div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-20 text-gray-600">Billed By:</span>
                  <span className="font-medium text-gray-900">{invoice.billedBy}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-600">For Center:</span>
                  <span className="font-medium text-gray-900">{invoice.forCenter}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Authorized Signature</p>
                  <div className="h-12 border-b border-gray-300 mt-2"></div>
                </div>
                <div className="text-xs text-gray-500">
                  <p>This is a computer generated invoice.</p>
                  <p>Thank you for choosing A1 Hospital!</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
