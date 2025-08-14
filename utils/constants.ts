import { PatientType } from '@/types'

export const HOSPITAL_INFO = {
  name: 'A1 Hospital',
  address: '123 Main Street, Cityville, State, 123456',
  contact: '+1 (555) 123-4567',
  website: 'www.A1hospital.com',
  appointmentLine: '+1 (555) 000-1234'
}

export const PATIENT_TYPES: PatientType[] = [
  'All',
  'Cash Patient', 
  'Insurance Patient',
  'Corporate',
  'Charity',
  'Other'
]

export const INVOICE_STATUS = {
  PAID: 'Paid' as const,
  UNPAID: 'Unpaid' as const
}

export const PAYMENT_MODES = {
  INSURANCE: 'Insurance' as const,
  CASH: 'Cash' as const
}

export const VIEW_TYPES = {
  OVERVIEW: 'overview' as const,
  PATIENT_WISE: 'patient-wise' as const,
  INVOICE_LIST: 'invoice-list' as const,
  INVOICE_VIEW: 'invoice-view' as const
}

export const DATE_FORMAT = 'dd/mm/yyyy'

export const CURRENCY_FORMAT = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

export const TABLE_PAGE_SIZE = 10

export const EXPORT_FORMATS = {
  PDF: 'PDF' as const,
  CSV: 'CSV' as const,
  EXCEL: 'Excel' as const
}