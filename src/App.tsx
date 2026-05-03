import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PlacedCandidate from './pages/PlacedCandidate'
import PlacementTraining from './pages/PlacementTraining'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placed-candidates" element={<PlacedCandidate />} />
        <Route path="/placement-training" element={<PlacementTraining />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App