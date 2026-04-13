import React from 'react';
import './Home.css';

function Help() {
  return (
    <div className="help-page container" style={{ padding: '4rem 0' }}>
      <h1>Help & Support</h1>
      <p className="lead">How can we help you today?</p>
      
      <div className="help-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="help-card" style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px' }}>
          <h3>For Interns</h3>
          <ul>
            <li>How to apply for internships?</li>
            <li>How to build a great profile?</li>
            <li>Uploading your resume</li>
            <li>Tracking your applications</li>
          </ul>
        </div>
        
        <div className="help-card" style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px' }}>
          <h3>For Companies</h3>
          <ul>
            <li>Posting a new internship</li>
            <li>Reviewing applications</li>
            <li>Verifying your company profile</li>
            <li>Contacting potential interns</li>
          </ul>
        </div>
        
        <div className="help-card" style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px' }}>
          <h3>Account & Privacy</h3>
          <ul>
            <li>Resetting your password</li>
            <li>Verifying your email</li>
            <li>Managing your notifications</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      
      <div className="contact-support" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h2>Still have questions?</h2>
        <p>Our support team is here to help.</p>
        <a href="mailto:support@easyintern.com" className="btn btn-primary">Contact Support</a>
      </div>
    </div>
  );
}

export default Help;
