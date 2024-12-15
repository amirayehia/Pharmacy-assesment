import React, { useState } from 'react'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function Modal ({ isOpen, onClose, onConfirm }: ModalProps) {
  return (
    <>
      <div
        id='popup-modal'
        tabIndex='-1'
        className='bg-slate-700 bg-opacity-30  fixed top-0 right-0 left-0 z-50 flex justify-center items-center m-auto w-full h-full'
      >
        <div className='relative p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow'>
            <button
              type='button'
              className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  '
              data-modal-hide='popup-modal'
            >
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='p-4 md:p-5 text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 '>
                Are you sure you want to delete this Item?
              </h3>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                onClick={onConfirm}
              >
                Yes, I'm sure
              </button>
              <button
                onClick={onClose}
                data-modal-hide='popup-modal'
                type='button'
                className='py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg border border-gray-200 hover:bg-darkgreen text-light    bg-lightgreen'
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
