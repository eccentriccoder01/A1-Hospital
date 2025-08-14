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

export interface InvoiceItem {
  code: string
  desc: string
  qty: number
  grossAmount: number
  discount: number
  patientShare: number
  taxAmount: number
  netBill: number
}

export interface InvoiceDetail {
  invoiceNo: string
  visitId: string
  date: string
  patientName: string
  mobile: string
  address: string
  paymentMode: 'Insurance' | 'Cash'
  items: InvoiceItem[]
  billedBy: string
  status: string
  netTaxCollection: number
  paymentMethod: string
  paymentTxnNumber: string
  amountInWords: string
  forCenter: string
}

export interface OverviewData {
  period: string
  patientType: string
  gross: number
  discount: number
  netAfterDiscount: number
  patientShare: number
  netExcludingPatientShare: number
}

export interface Totals {
  gross: number
  discount: number
  netAfterDiscount: number
  patientShare: number
  netExcludingPatientShare: number
}