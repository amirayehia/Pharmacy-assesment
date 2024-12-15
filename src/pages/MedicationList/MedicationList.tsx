import React from 'react'
import Table from '../../components/Table/Table.tsx'
import Layout from '../../layouts/Layout.tsx'
import Title from '../../components/Title/Title.tsx'
import { MedicalListProvider, useMedicalList } from './MedicalListcontext.tsx'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Modal from '../../components/Modal/Modal.tsx'

export default function MedicationList () {
  return (
    <MedicalListProvider children={undefined}>
      <Content />
    </MedicalListProvider>
  )
}

function Content () {
  const {
    medicalDataListWithSearch,
    loading,
    error,
    setSearchItem,
    deleteModal,
    showDiscardModalWithId,
    cancelDelete,
    deleteRow
  } = useMedicalList()
  const columns = [
    { header: 'ID', index: 'id' },
    { header: 'MEDICINE NAME', index: 'title' },
    { header: 'DESCRIBTION', index: 'body' },
  ]
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchItem(e.target[0].value)
  }
  return (
    <Layout>
      <div className='flex items-center justify-between'>
        <Title title='Medication List' />
        <form
          onSubmit={searchHandler}
          className='searchbar flex border-2 border-darkgreen-400 rounded-full p-1 '
        >
          <MagnifyingGlassIcon className='w-6 text-gray-400 ms-3' />
          <input
            type='text'
            placeholder='Search..'
            className='bg-transparent h-12 w-96 ms-1 outline-none '
          />
        </form>
      </div>
      <div className='w-full overflow-auto h-lvh'>
        {loading ? (
          <ArrowPathIcon className='w-10 m-auto animate-spin' />
        ) : (
          <Table
            columns={columns}
            rowsData={medicalDataListWithSearch}
            deleteRowData={deleteModal}
          />
        )}
      </div>
      {showDiscardModalWithId && (
        <Modal
          children={undefined}
          isOpen={false}
          onClose={cancelDelete}
          onConfirm={deleteRow}
        ></Modal>
      )}
    </Layout>
  )
}
