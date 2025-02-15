
import './App.css'
import Capture from './components/Capture'
import Footer from './components/Footer'
import Hero from './components/Hero'
import { CaptureProvider } from './context/Context'

function App() {
  

  return (
  <CaptureProvider>
   <Hero/>
   <Capture/>
  <Footer/>
  </CaptureProvider>
  )
}

export default App
