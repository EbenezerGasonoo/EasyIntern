import logoImage from '../assets/logo.svg?url'
import logoLightImage from '../assets/logo-light.svg?url'
import './Logo.css'

function Logo({ size = 'medium', theme = 'dark' }) {
  const src = theme === 'light' ? logoLightImage : logoImage

  return (
    <div className={`logo logo-${size} logo-${theme}`}>
      <img 
        src={src}
        alt="EasyIntern Logo" 
        className="logo-image"
        onError={(e) => {
          // Fallback if image doesn't exist yet
          e.target.style.display = 'none'
          if (e.target.nextSibling) {
            e.target.nextSibling.style.display = 'flex'
          }
        }}
      />
      <div className="logo-fallback" style={{ display: 'none' }}>
        <svg 
          className="logo-icon" 
          viewBox="0 0 60 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15 25C15 20 18 15 25 12C28 10.5 32 10 35 12C38 14 40 18 38 22C37 25 35 27 32 28C30 29 28 30 28 32C28 34 30 35 32 35C35 35 37 33 38 30C39 28 40 26 42 25C44 24 46 25 47 27C48 29 47 31 45 32C43 33 41 34 40 36C38 39 38 42 40 44C42 46 45 47 48 45C50 44 52 42 52 40C52 38 50 36 48 35C46 34 44 33 43 31C42 29 42 27 43 25C44 23 46 22 48 22C50 22 52 23 53 25C54 27 54 29 53 31C52 33 50 34 48 34" 
            stroke="#FF6B35" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}

export default Logo
