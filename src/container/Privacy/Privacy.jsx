import React, { useEffect } from 'react';
import './Privacy.scss';

const Privacy = () => {
  useEffect(() => {
    // Set scroll position to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app__privacy">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: 6 March 2024</p>

        <h2>1. Introduction</h2>
        <p>Welcome to No Nothing ("we", "us", or "our"). This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our website nonothing.com and the services offered through it.</p>

        <h2>2. Information We Collect</h2>
        <p>We may collect various types of information, including but not limited to:</p>
        <ul>
          <li>Personal Information: such as your name, email address, and contact details.</li>
          <li>Log Data: information about your device, browser, IP address, and pages you visit on nonothing.com.</li>
          <li>Cookies: small data files stored on your device to enhance your experience on our website.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for various purposes, including:</p>
        <ul>
          <li>To provide and maintain our website.</li>
          <li>To personalize your experience.</li>
          <li>To communicate with you about our products and services.</li>
          <li>To improve nonothing.com and our services.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2>4. Information Sharing and Disclosure</h2>
        <p>We may share your information with third parties in the following circumstances:</p>
        <ul>
          <li>With your consent.</li>
          <li>To comply with legal obligations.</li>
          <li>To protect our rights or the rights of others.</li>
        </ul>

        <h2>5. Your Choices</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal information.</li>
          <li>Opt-out of receiving promotional communications.</li>
          <li>Disable cookies through your browser settings.</li>
        </ul>

        <h2>6. Security</h2>
        <p>We take reasonable measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. The updated version will be effective upon posting on nonothing.com.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about our Privacy Policy, please contact us at mail@nonothing.com.</p>
      </div>
    </div>
  );
};

export default Privacy;
