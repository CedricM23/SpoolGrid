import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router'
import BottomNavbar from './components/Navbar/BottomNavbar'
import HomeView from './Views/HomeView/HomeView'
import LogShotSheet from './components/LogShotSheet/LogShotSheet'
import LoadSpoolView from './Views/LoadSpoolView/LoadSpoolView'
import SettingsView from './Views/SettingsView/SettingsView'
import ArchivedView from './Views/ArchivedView/ArchivedView'
import { registerSW } from 'virtual:pwa-register'
import SpoolDetailView from './Views/SpoolDetailView/SpoolDetailView'

function App() {

  registerSW({ immediate: true })


  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/spool/new" element={<LoadSpoolView />} />
          <Route path='/settings' element={<SettingsView />}/>
          <Route path='/Archived' element={<ArchivedView/>} />
          <Route path='/spool/:id' element={<SpoolDetailView/>} />
        </Routes>
        <BottomNavbar />
      
      </BrowserRouter>
    </div>
  )
}

export default App
