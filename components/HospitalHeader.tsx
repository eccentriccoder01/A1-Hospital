'use client'

import React from 'react'
import { ViewType } from '@/app/page'

interface HospitalHeaderProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const HospitalHeader: React.FC<HospitalHeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">A1 Hospital</h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p>123 Main Street, Cityville, State, 123456</p>
              <p>
                Contact: +1 (555) 123-4567 | Website:{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  www.A1hospital.com
                </a>
              </p>
              <p>Appointment Line: +1 (555) 000-1234</p>
            </div>
          </div>
          
          {currentView === 'invoice-list' && (
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                User Name: Bill Desk
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                  Export as PDF
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
                  Export as CSV
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentView !== 'invoice-view' && (
          <div className="mt-6">
            {currentView === 'invoice-list' ? (
              <h2 className="text-xl font-semibold text-gray-900">Invoices List</h2>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewChange('overview')}
                  className={`px-4 py-2 rounded border text-sm font-medium ${
                    currentView === 'overview'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => onViewChange('patient-wise')}
                  className={`px-4 py-2 rounded border text-sm font-medium ${
                    currentView === 'patient-wise'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Patient-Wise
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default HospitalHeader