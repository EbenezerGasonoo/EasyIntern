import { Link, useLocation } from 'react-router-dom'
import './SiteFooter.css'

function SiteFooter() {
  const location = useLocation()
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isHome = location.pathname === '/'

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <h3>EasyIntern</h3>
          <p>
            Connecting talented interns with companies across Ghana through a
            faster, smarter hiring journey.
          </p>
          <div className="site-footer-social" aria-label="EasyIntern social media">
            <a
              href="https://www.facebook.com/share/1N4j4nmKuq/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EasyIntern on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.3c0-.9.3-1.5 1.6-1.5h1.2V5.1c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.6v3h2.3v7h2.6Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/easyinterninc?igsh=aDgzcGx2dWs4aDRh&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EasyIntern on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.3 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </a>
            <a
              href="https://x.com/easyinterninc?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EasyIntern on X"
              title="X"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M18.9 3h2.9l-6.3 7.2L23 21h-5.9l-4.6-6-5.2 6H4.4l6.8-7.8L1 3h6l4.2 5.5L18.9 3Zm-1 16h1.6L6.1 4.9H4.4L17.9 19Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="site-footer-links">
          <h4>Explore</h4>
          <Link to="/jobs">Internships</Link>
          <Link to="/interns">Interns</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/help">FAQ & Help</Link>
        </div>

        <div className="site-footer-links">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register?type=intern">For Interns</Link>
          <Link to="/register?type=company">For Companies</Link>
          {!isHome && <Link to="/">Back to home</Link>}
        </div>

        <div className="site-footer-actions">
          <h4>Stay connected</h4>
          <p>Follow us on social media for updates and opportunities.</p>
          <button type="button" className="site-footer-top-btn" onClick={scrollToTop}>
            Back to top
          </button>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="container">
          <p>© {year} EasyIntern. Built for career growth and hiring impact.</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
