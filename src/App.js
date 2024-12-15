import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header.tsx'
import MedicationList from './pages/MedicationList/MedicationList.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/'  element={<MedicationList />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
