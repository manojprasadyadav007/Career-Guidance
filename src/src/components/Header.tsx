import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="brand">
            <div className="brand-mark">CB</div>
            <div className="brand-text">
              <span className="brand-name">
                Career<span className="brand-name-highlight"> Boost</span>
              </span>
              <span className="brand-tagline">Where learning never stops</span>
            </div>
          </div>
        </Link>
      </div>

      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/placed-candidates">Placed Candidate</Link>
          </li>
          <li>
            <Link to="/placement-training">Placement Training</Link>
          </li>
           {/* <li>
            <Link to="/top-mate">Top Mate</Link>
          </li> */}
            <li>
            <Link to="/contact">Contact</Link>
          </li>
              {/* <li>
            <Link to="/profile">Profile</Link>
          </li> */}
        </ul>
      </nav>

      {/* <div className="header-actions">
        <button className="header-mock-interview-btn" type="button">
          💬 AI Mock Interview
        </button>
        <button
          className="header-theme-toggle"
          type="button"
          aria-label="Toggle theme"
        >
          ☀️
        </button>
        <button className="header-login-btn" type="button">
          Login
        </button>
      </div> */}
    </header>
  )
}

export default Header
