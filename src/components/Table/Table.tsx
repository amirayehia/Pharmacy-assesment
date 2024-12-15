import { TrashIcon } from '@heroicons/react/16/solid'
import React from 'react'

type TableProps = {
  columns: {
    header: string
    index: string
  }[]
  rowsData: { id: number; [key: string]: any }[]
  deleteRowData: (id: number) => void
}

export default function Table({ columns, rowsData, deleteRowData }: TableProps) {
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
      <thead className='text-xs text-light uppercase bg-lightgreen'>
        <tr>
          {columns.map((col) => (
            <th scope='col' className='px-6 py-3' key={col.index}>
              {col.header}
            </th>
          ))}
          <th scope='col' className='px-6 py-3'>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {rowsData.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1}>
              <div className='text-3xl my-10 text-center'>there are no data</div>
            </td>
          </tr>
        ) : (
          rowsData.map((data) => (
            <tr className='bg-white border-b' key={data.id}>
              {columns.map((col) => (
                <td
                  className='px-6 py-4 font-medium text-gray-900'
                  key={col.index}
                  title={data[col.index]}
                >
                  {data[col.index]}
                </td>
              ))}
              <td onClick={() => deleteRowData(data.id)}>
                <TrashIcon
                  className='w-6 text-red-500 cursor-pointer'
                  aria-label={`Delete row with ID ${data.id}`}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
