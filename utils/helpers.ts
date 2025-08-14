import { CURRENCY_FORMAT } from './constants'

/**
 * Format currency amount to USD format
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', CURRENCY_FORMAT).format(amount)
}

/**
 * Format date string to display format
 */
export const formatDate = (dateString: string): string => {
  try {
    // Assuming input format is dd/mm/yyyy
    const [day, month, year] = dateString.split('/')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })
  } catch (error) {
    return dateString // Return original if parsing fails
  }
}

/**
 * Convert number to words for invoice amounts
 */
export const numberToWords = (amount: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  const thousands = ['', 'Thousand', 'Million', 'Billion']

  if (amount === 0) return 'Zero Dollars'

  const convertHundreds = (num: number): string => {
    let result = ''
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' Hundred '
      num %= 100
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' '
      num %= 10
    } else if (num >= 10) {
      result += teens[num - 10] + ' '
      return result
    }
    
    if (num > 0) {
      result += ones[num] + ' '
    }
    
    return result
  }

  const dollars = Math.floor(amount)
  const cents = Math.round((amount - dollars) * 100)
  
  let result = ''
  let chunkCount = 0
  let temp = dollars

  while (temp > 0) {
    const chunk = temp % 1000
    if (chunk !== 0) {
      result = convertHundreds(chunk) + thousands[chunkCount] + ' ' + result
    }
    temp = Math.floor(temp / 1000)
    chunkCount++
  }

  result = result.trim() + ' Dollar' + (dollars !== 1 ? 's' : '')
  
  if (cents > 0) {
    result += ' and ' + cents + ' Cent' + (cents !== 1 ? 's' : '')
  }
  
  return result + ' Only'
}

/**
 * Generate unique transaction number
 */
export const generateTxnNumber = (): string => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `TXN${timestamp}${random}`
}

/**
 * Validate date format (dd/mm/yyyy)
 */
export const isValidDateFormat = (dateString: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!regex.test(dateString)) return false
  
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day
}

/**
 * Filter data by date range
 */
export const filterByDateRange = <T extends { invoiceDate: string }>(
  data: T[],
  fromDate: string,
  toDate: string
): T[] => {
  if (!fromDate || !toDate) return data
  
  if (!isValidDateFormat(fromDate) || !isValidDateFormat(toDate)) return data
  
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number)
    return new Date(year, month - 1, day)
  }
  
  const from = parseDate(fromDate)
  const to = parseDate(toDate)
  
  return data.filter(item => {
    const itemDate = parseDate(item.invoiceDate)
    return itemDate >= from && itemDate <= to
  })
}

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Export data to CSV format
 */
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      }).join(',')
    )
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}