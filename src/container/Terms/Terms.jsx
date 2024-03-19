import React, { useEffect } from 'react';
import './Terms.scss';

const Terms = () => {
  useEffect(() => {
      // Set scroll position to the top of the page when the component mounts
      window.scrollTo(0, 0);
    }, []);

  return (
  <div className="app__terms">
    <div className="terms-container">
      <h1>Terms of Use</h1>
      <p>Last updated: 6 March 2024</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using No Nothing's website (nonothing.com), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please refrain from using our website.</p>

      <h2>2. Use of the Website</h2>
      <p>You agree to use nonothing.com for lawful purposes and in a manner consistent with all applicable laws and regulations. You may not use our website in any way that could impair its performance, damage its content, or interfere with other users' ability to use it.</p>

      <h2>3. Intellectual Property</h2>
      <p>The content on nonothing.com, including text, graphics, logos, and images, is the property of No Nothing and is protected by intellectual property laws. You may not use, reproduce, distribute, or display any portion of the website without our prior written consent.</p>

      {/* 4. User Account */}
      <h2>4. User Account</h2>
      <p>If you create an account on nonothing.com, you are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>

      {/* 5. Limitation of Liability */}
      <h2>5. Limitation of Liability</h2>
      <p>No Nothing and its affiliates are not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of nonothing.com. This includes but is not limited to, any errors or omissions in the content, loss or damage of data, or any other matter related to the website.</p>

      {/* 6. Changes to Terms of Use */}
      <h2>6. Changes to Terms of Use</h2>
      <p>We reserve the right to update or modify these Terms of Use at any time without prior notice. The updated version will be effective upon posting on nonothing.com.</p>

      {/* Contact Information */}
      <h2>7. Contact Us</h2>
      <p>If you have any questions or concerns about our Terms of Use, please contact us at mail@nonothing.com.</p>
    </div>
    </div>
  );
};

export default Terms