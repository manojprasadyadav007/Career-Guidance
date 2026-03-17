import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PlacedCandidate from './pages/PlacedCandidate'
import PlacementTraining from './pages/PlacementTraining'

function App() {
  return (
    <Router basename="/Carreer-Guidance">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placed-candidates" element={<PlacedCandidate />} />
        <Route path="/placement-training" element={<PlacementTraining />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App