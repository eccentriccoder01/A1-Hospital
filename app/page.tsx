'use client'

import React, { useState } from 'react'
import HospitalHeader from '@/components/HospitalHeader'
import Overview from '@/components/Overview'
import PatientWise from '@/components/PatientWise'
import InvoiceList from '@/components/InvoiceList'
import InvoiceView from '@/components/InvoiceView'

export type ViewType = 'overview' | 'patient-wise' | 'invoice-list' | 'invoice-view'
export type PatientType = 'All' | 'Cash Patient' | 'Insurance Patient' | 'Corporate' | 'Charity' | 'Other'

export interface Patient {
  id: string
  name: string
  invoiceDate: string
  invoiceNumber: string
  patientType: PatientType
  doctor: string
  gross: number
  discount: number
  net: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  invoiceDate: string
  patientName: string
  doctor: string
  grossAmount: number
  discount: number
  patientShare: number
  taxAmount: number
  netBill: number
  invoiceDue: number
  status: 'Paid' | 'Unpaid'
  billedBy: string
  patientType: 'Insurance' | 'Cash'
}

export interface InvoiceDetail {
  invoiceNo: string
  visitId: string
  date: string
  patientName: string
  mobile: string
  address: string
  paymentMode: 'Insurance' | 'Cash'
  items: {
    code: string
    desc: string
    qty: number
    grossAmount: number
    discount: number
    patientShare: number
    taxAmount: number
    netBill: number
  }[]
  billedBy: string
  status: string
  netTaxCollection: number
  paymentMethod: string
  paymentTxnNumber: string
  amountInWords: string
  forCenter: string
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('overview')
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetail | null>(null)

  const handleViewInvoice = (invoice: InvoiceDetail) => {
    setSelectedInvoice(invoice)
    setCurrentView('invoice-view')
  }

  const handleBackToList = () => {
    setCurrentView('invoice-list')
    setSelectedInvoice(null)
  }

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Overview />
      case 'patient-wise':
        return <PatientWise />
      case 'invoice-list':
        return <InvoiceList onViewInvoice={handleViewInvoice} />
      case 'invoice-view':
        return selectedInvoice ? (
          <InvoiceView 
            invoice={selectedInvoice} 
            onBack={handleBackToList}
          />
        ) : null
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="p-6">
        {renderView()}
      </main>
    </div>
  )
}