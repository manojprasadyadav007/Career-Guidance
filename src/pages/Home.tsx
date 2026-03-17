import { Button, Typography } from '@mui/material'
import PlacedCandidate from './PlacedCandidate'
import '../style.css'

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="home-hero-section">
        <div className="home-hero-container">
          <div className="home-hero-layout">
            {/* Left Side */}
            <div className="home-hero-left">
              <div className="home-hero-title-box">
                <h1 className="home-hero-title">
                  <span className="home-hero-title-main">Your One-Stop Destination</span>
                  <svg
                    width="373"
                    height="24"
                    viewBox="0 0 373 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'block', marginTop: '8px' }}
                  >
                    <path
                      d="M2 14.5C80.5 2.5 163.5 -3 262 7C360.5 17 371.5 22 371.5 22"
                      stroke="#9333EA"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </h1>
                <div className="home-hero-title-second">
                  for <span className="home-hero-title-highlight">Non-Stop Learning!</span>
                </div>
              </div>

              <p className="home-hero-description">
                Your Ultimate Hub for World-Class Tech Roadmaps{' '}
                <span className="home-hero-description-bold">
                  Master cutting-edge tech with expert-led, AI-powered courses
                </span>
                , and{' '}
                <span className="home-hero-description-bold">
                  hands-on projects
                </span>
                -get interview-ready fast.
              </p>

              <div className="home-hero-buttons">
                <Button variant="contained" className="home-hero-btn-primary">
                  Start Learning Today →
                </Button>
                <Button variant="outlined" className="home-hero-btn-secondary">
                  Request Callback
                </Button>
              </div>

              <div className="home-hero-stats-container">
                <div className="home-hero-stat">
                  <Typography variant="h4" className="home-hero-stat-number">
                    1000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Career Transitions
                  </Typography>
                </div>
                <div className="home-hero-stat">
                  <Typography variant="h4" className="home-hero-stat-number">
                    156%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Salary Hike
                  </Typography>
                </div>
                <div className="home-hero-stat">
                  <Typography variant="h4" className="home-hero-stat-number">
                    15+ LPA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average CTC
                  </Typography>
                </div>
                <div className="home-hero-stat">
                  <Typography variant="h4" className="home-hero-stat-number">
                    97.8%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Success Rate
                  </Typography>
                </div>
              </div>
            </div>

            {/* Right Side - Cards */}
            <div className="home-hero-right">
              <div className="home-card-grid">
                {/* Card 1: Roadmaps */}
                <div className="home-card home-card--roadmaps">
                  <div className="home-card-content">
                    <h3 className="home-card-title">Roadmaps</h3>
                    <p className="home-card-subtitle">Step-by-Step Paths</p>
                    <p className="home-card-description">to Land Your Dream Role</p>
                  </div>
                </div>

                {/* Card 2: Mentorship */}
                <div className="home-card home-card--mentorship">
                  <div className="home-card-content">
                    <h3 className="home-card-title">1:1 Mentorship</h3>
                    <p className="home-card-subtitle">Personal Guidance</p>
                    <p className="home-card-description">from Industry Experts</p>
                  </div>
                </div>

                {/* Card 3: Placement */}
                <div className="home-card home-card--placement">
                  <div className="home-card-content">
                    <h3 className="home-card-title">Placement Training</h3>
                    <p className="home-card-subtitle">Crack Top Tech Jobs</p>
                    <p className="home-card-description">Right from Campus</p>
                  </div>
                </div>

                {/* Card 4: Articles */}
                <div className="home-card home-card--articles">
                  <div className="home-card-content">
                    <h3 className="home-card-title">Articles</h3>
                    <p className="home-card-subtitle">Clear Concepts,</p>
                    <p className="home-card-description">Practical Examples, Ready for Interviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Placed Candidates Section */}
      <PlacedCandidate />
    </main>
  )
}

export default Home
