import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode
} from 'react'
import { getAllMedicalList, Data } from '../../services/MedicainService.ts'

interface MedicalDashboardContextProps {
  barchartData: number[]
  loading: boolean
  error: string | null
  inventoryData: { [key: string]: number }
}

const MedicalDashboardContext = createContext<
  MedicalDashboardContextProps | undefined
>(undefined)

export const useMedicalDashboard = () => {
  const context = useContext(MedicalDashboardContext)
  if (!context) {
    throw new Error(
      'useMedicalDashboard must be used within a MedicalDashboardProvider'
    )
  }
  return context
}

export const MedicalDashboardProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [medicalDataList, setMedicalDataList] = useState<Data[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inventoryData = {
    'Medication A': 10,
    'Medication B': 15,
    'Medication C': 5
  }
  // Fetch medical data
  useEffect(() => {
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
    fetchData()
  }, [])
  // Apply search filtering
  const barchartData = useMemo(() => {
    const obj: { odd: number; even: number } = { odd: 0, even: 0 }
    medicalDataList.map((data: any) => {
      if (data.id % 2 == 0) obj.even++
      else obj.odd++
    })
    return Object.values(obj)
  }, [medicalDataList])
  console.log(barchartData)

  return (
    <MedicalDashboardContext.Provider
      value={{
        inventoryData,
        barchartData,
        loading,
        error
      }}
    >
      {children}
    </MedicalDashboardContext.Provider>
  )
}
