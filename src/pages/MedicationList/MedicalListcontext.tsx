import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode
} from 'react'
import {
  getAllMedicalList,
  Data,
  deleteItem
} from '../../services/MedicainService.ts'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface MedicalListContextProps {
  medicalDataListWithSearch: any[]
  loading: boolean
  error: string | null
  searchItem: string
  setSearchItem: React.Dispatch<React.SetStateAction<string>>
  deleteModal: () => void
  showDiscardModal: boolean
  cancelDelete: () => void
  deleteRow: (id: number) => void
}

const MedicalListContext = createContext<MedicalListContextProps | undefined>(
  undefined
)

export const useMedicalList = () => {
  const context = useContext(MedicalListContext)
  if (!context) {
    throw new Error('useMedicalList must be used within a MedicalListProvider')
  }
  return context
}

export const MedicalListProvider = ({ children }: { children: ReactNode }) => {
  const [medicalDataList, setMedicalDataList] = useState<Data[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [showDiscardModalWithId, setShowDiscardModalWithId] = useState<
    null | number
  >(null)

  // Fetch medical data
  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await getAllMedicalList()
      setMedicalDataList(data)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  // Apply search filtering
  const medicalDataListWithSearch: Data = useMemo(() => {
    if (!searchItem.trim()) return medicalDataList
    return medicalDataList.filter((item: any) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    )
  }, [searchItem, medicalDataList])

  const deleteModal = (id: number) => {
    setShowDiscardModalWithId(id)
  }
  const cancelDelete = () => {
    setShowDiscardModalWithId(null)
  }
  const deleteRow = async () => {
    setLoading(true)
    try {
      const { data } = await deleteItem(showDiscardModalWithId)
      console.log(data)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      toast.error('This is an error notification!', {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }
    setShowDiscardModalWithId(null)
    fetchData()
  }
  return (
    <MedicalListContext.Provider
      value={{
        medicalDataListWithSearch,
        loading,
        error,
        searchItem,
        setSearchItem,
        deleteModal,
        showDiscardModalWithId,
        cancelDelete,
        deleteRow
      }}
    >
      {children}
    </MedicalListContext.Provider>
  )
}
