import './Profile.css'
import CodeIcon from '@mui/icons-material/Code'
import SchoolIcon from '@mui/icons-material/School'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FlightIcon from '@mui/icons-material/Flight'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import StarIcon from '@mui/icons-material/Star'
import EmailIcon from '@mui/icons-material/Email'
import WorkIcon from '@mui/icons-material/Work'
import PhoneIcon from '@mui/icons-material/Phone'
import BusinessIcon from '@mui/icons-material/Business'
import InfoIcon from '@mui/icons-material/Info'

function Profile() {
  const angularDomains = [
    { name: 'Higher Education Abroad', icon: <SchoolIcon /> },
    { name: 'Healthcare', icon: <LocalHospitalIcon /> },
    { name: 'Gaming', icon: <SportsEsportsIcon /> },
    { name: 'Banking & Financial Services', icon: <AccountBalanceIcon /> },
    { name: 'Manufacturing & Industrial Automation', icon: <PrecisionManufacturingIcon /> }
  ]

  const reactDomains = [
    { name: 'Healthcare', icon: <LocalHospitalIcon /> },
    { name: 'E-commerce', icon: <ShoppingCartIcon /> },
    { name: 'EdTech', icon: <SchoolIcon /> },
    { name: 'Travel & Hospitality', icon: <FlightIcon /> },
    { name: 'Real Estate', icon: <HomeWorkIcon /> }
  ]

  const skills = [
    { name: 'Angular', level: 'Expert' },
    { name: 'React JS', level: 'Expert' },
    { name: 'JavaScript', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'HTML', level: 'Expert' },
    { name: 'CSS', level: 'Expert' },
    { name: 'Bootstrap', level: 'Expert' },
    { name: 'PrimeNG', level: 'Expert' }
  ]

  return (
    <div className="profile-container">
      {/* Hero Section */}
      <section className="profile-hero-section">
        <div className="profile-hero-content">
          <div className="profile-hero-icon">
            <CodeIcon sx={{ fontSize: 80 }} />
          </div>
          <h1 className="profile-hero-title">Frontend Developer</h1>
          <p className="profile-hero-summary">
            Passionate and results-driven Frontend Developer with <strong>6+ years of experience</strong> in building
            scalable, high-performance web applications. Successfully delivered <strong>10+ projects</strong> across
            multiple domains including Healthcare, E-commerce, Banking, Education, and more. Expertise in modern
            JavaScript frameworks, responsive design, and creating exceptional user experiences.
          </p>
          <div className="profile-hero-stats">
            <div className="profile-stat-item">
              <div className="profile-stat-number">6+</div>
              <div className="profile-stat-label">Years Experience</div>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-number">10+</div>
              <div className="profile-stat-label">Projects Delivered</div>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-number">8</div>
              <div className="profile-stat-label">Expert Skills</div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Experience Section */}
      <section className="domain-section">
        <h2 className="profile-section-title">
          <WorkIcon sx={{ fontSize: 32, marginRight: 1 }} />
          Domain Experience
        </h2>

        <div className="domain-grid">
          {/* Angular Experience */}
          <div className="domain-card angular-card">
            <div className="domain-header">
              <div className="domain-icon angular-icon">
                <CodeIcon sx={{ fontSize: 40 }} />
              </div>
              <h3 className="domain-title">Angular Experience</h3>
            </div>
            <div className="domain-list">
              {angularDomains.map((domain, index) => (
                <div key={index} className="domain-item">
                  <div className="domain-item-icon">{domain.icon}</div>
                  <span>{domain.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* React JS Experience */}
          <div className="domain-card react-card">
            <div className="domain-header">
              <div className="domain-icon react-icon">
                <CodeIcon sx={{ fontSize: 40 }} />
              </div>
              <h3 className="domain-title">React JS Experience</h3>
            </div>
            <div className="domain-list">
              {reactDomains.map((domain, index) => (
                <div key={index} className="domain-item">
                  <div className="domain-item-icon">{domain.icon}</div>
                  <span>{domain.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="skills-section">
        <h2 className="profile-section-title">
          <StarIcon sx={{ fontSize: 32, marginRight: 1 }} />
          Technical Skills
        </h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-level">
                <span className="skill-badge">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="info-section">
        <h2 className="profile-section-title">
          <InfoIcon sx={{ fontSize: 32, marginRight: 1 }} />
          Contact Information
        </h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon email-icon">
              <EmailIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="info-content">
              <div className="info-label">EMAIL</div>
              <a href="mailto:manojprasadyadav007@gmail.com" className="info-value">
                manojprasadyadav007@gmail.com
              </a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon phone-icon">
              <PhoneIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="info-content">
              <div className="info-label">MOBILE</div>
              <a href="tel:9113363283" className="info-value">
                9113363283
              </a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon education-icon">
              <SchoolIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="info-content">
              <div className="info-label">EDUCATION</div>
              <div className="info-value">MCA - NIT Raipur</div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon company-icon">
              <BusinessIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="info-content">
              <div className="info-label">CURRENT COMPANY</div>
              <div className="info-value">Nitor Infotech Pvt Ltd</div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon previous-icon">
              <WorkIcon sx={{ fontSize: 28 }} />
            </div>
            <div className="info-content">
              <div className="info-label">PREVIOUS COMPANY</div>
              <div className="info-value">HCL Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2 className="contact-title" >Let's Work Together</h2>
          <p className="contact-text">
            I'm available for freelance projects, full-time opportunities, and consulting work.
          </p>
          <div className="contact-buttons">
            <button className="btn btn-primary">
              <EmailIcon sx={{ marginRight: 1 }} />
              Contact Me
            </button>
            <button className="btn btn-secondary">
              <WorkIcon sx={{ marginRight: 1 }} />
              Hire Me
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
