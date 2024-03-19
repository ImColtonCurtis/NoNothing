import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import './ContactForm.scss';

const ContactForm = ({ toggleModal }) => {
    const [contactFormName, setContactFormName] = useState(sessionStorage.getItem('contactFormName') || '');  
    const [isValidContactFormName, setValidContactFormName] = useState(true);
  
    const [contactFormEmail, setContactFormEmail] = useState(sessionStorage.getItem('contactFormEmail') || '');  
    const [isValidContactFormEmail, setValidContactFormEmail] = useState(true);
  
    const [contactFormTopic, setContactFormTopic] = useState(sessionStorage.getItem('contactFormTopic') || '');  
    const [isValidContactFormTopic, setValidContactFormTopic] = useState(true);
  
    const [contactFormMessage, setContactFormMessage] = useState(sessionStorage.getItem('contactFormMessage') || '');  
    const [isValidContactFormMessage, setValidContactFormMessage] = useState(true);
  
    const [isContactFormSubmitted, setContactFormSubmitted] = useState(false);
  
    useEffect(() => {
      // Check sessionStorage to see if the user has submitted an email
      const storedSubmittedStatus = sessionStorage.getItem('isContactFormSubmitted');
      if (storedSubmittedStatus) {
        setContactFormSubmitted(true);
      }
    }, []);
  
    const handleSubmit = () => {
      // Perform validation logic here
      // Perform email validation
      const isNameValid = validateContactFormName(contactFormName);
      const isEmailValid = validateContactFormEmail(contactFormEmail);
      const isTopicValid = validateContactFormTopic(contactFormTopic);
      const isMessageValid = validateContactFormMessage(contactFormMessage);
  
      if (isNameValid)
        setValidContactFormName(true);
      else
        setValidContactFormName(false);
  
      if (isEmailValid)
        setValidContactFormEmail(true);
      else
        setValidContactFormEmail(false);
  
      if (isTopicValid)
        setValidContactFormTopic(true);
      else
        setValidContactFormTopic(false);
  
      if (isMessageValid)
        setValidContactFormMessage(true);
      else
        setValidContactFormMessage(false);
  
      if (isNameValid && isEmailValid && isTopicValid && isMessageValid) {
        setContactFormSubmitted(true);
  
        // Store the submitted status in sessionStorage
        sessionStorage.setItem('isContactFormSubmitted', 'true');
      }
    };
  
    const validateContactFormName = (contactFormName) => {
      // Check if the name is not empty
      if (!contactFormName.trim()) {
        return false;
      }
  
      // Check if the name contains only letters and spaces
      const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
      if (!nameRegex.test(contactFormName)) {
        return false;
      }
  
      // Check if the name has a minimum and maximum length
      const minLength = 2;
      const maxLength = 50;
      if (contactFormName.length < minLength || contactFormName.length > maxLength) {
        return false;
      }
  
      // Check if there are no consecutive spaces
      if (/(\s{2,})/.test(contactFormName)) {
        return false;
      }
  
      // Check if the name doesn't start or end with a space
      if (contactFormName.startsWith(' ') || contactFormName.endsWith(' ')) {
        return false;
      }
    
      return true;
    };
  
    const validateContactFormEmail = (contactFormEmail) => {
      // Basic email validation (contains '@' symbol and '.')
      if (!contactFormEmail.includes('@') || !contactFormEmail.includes('.')) {
        return false;
      }
    
      // Check for a valid position of '@'
      if (contactFormEmail.indexOf('@') <= 0) {
        return false;
      }
    
      // Check for consecutive dots
      if (/(\.{2,})/.test(contactFormEmail)) {
        return false;
      }
    
      // Check if the domain has at least one '.' after '@'
      const domainParts = contactFormEmail.split('@')[1].split('.');
      if (domainParts.length < 2) {
        return false;
      }
    
      return true;
    };
  
    const validateContactFormTopic = (contactFormTopic) => {
      // Check if the name is not empty
      if (!contactFormTopic.trim()) {
        return false;
      }
    
      return true;
    };
  
    const validateContactFormMessage = (contactFormMessage) => {
      // Check if the name is not empty
      if (!contactFormMessage.trim()) {
        return false;
      }
    
      return true;
    };
    
    return (
      <motion.div 
        className="app__contactForm app__flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >      
        <div className="app__contactForm-container">
          <div className="app__contactForm-content">
            {!isContactFormSubmitted ? (
              <motion.div
                className="app__contactForm-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h1>Contact Form</h1>
                <input
                  className="top-input"
                  type="text"
                  placeholder="Your Full Name"
                  value={contactFormName}
                  onChange={(e) => {
                    setContactFormName(e.target.value);
                    setValidContactFormName(true); // Reset validation status when typing
                    sessionStorage.setItem('contactFormName', e.target.value);
                  }}
                  style={{ 
                    borderColor: contactFormName.trim() ? (isValidContactFormName ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                />
                <input
                  type="text"
                  placeholder="Your Email"
                  value={contactFormEmail}
                  onChange={(e) => {
                    setContactFormEmail(e.target.value);
                    setValidContactFormEmail(true); // Reset validation status when typing
                    sessionStorage.setItem('contactFormEmail', e.target.value);
                  }}
                  style={{ 
                    borderColor: contactFormEmail.trim() ? (isValidContactFormEmail ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                />
                <input
                  type="text"
                  placeholder="Topic: Reason For Contact"
                  value={contactFormTopic}
                  onChange={(e) => {
                    setContactFormTopic(e.target.value);
                    setValidContactFormTopic(true); // Reset validation status when typing
                    sessionStorage.setItem('contactFormTopic', e.target.value);
                  }}
                  className="input-textarea" // Apply the class here
                  style={{ 
                    borderColor: contactFormTopic.trim() ? (isValidContactFormTopic ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                />
                <input
                  type="text"
                  placeholder="Message"
                  className="bottom-field"
                  value={contactFormMessage}
                  onChange={(e) => {
                    setContactFormMessage(e.target.value);
                    setValidContactFormMessage(true); // Reset validation status when typing
                    sessionStorage.setItem('contactFormMessage', e.target.value);
                  }}
                  style={{ 
                    borderColor: contactFormMessage.trim() ? (isValidContactFormMessage ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}                
                />
  
                <button
                  onClick={handleSubmit}
                  style={{
                    cursor: contactFormName && isValidContactFormName && contactFormEmail && isValidContactFormEmail && contactFormTopic && isValidContactFormTopic && contactFormMessage && isValidContactFormMessage ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!contactFormName || !isValidContactFormName || !contactFormEmail || !isValidContactFormEmail || !contactFormTopic || !isValidContactFormTopic || !contactFormMessage || !isValidContactFormMessage}
                >
                  {'Submit Form'}
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="form-submitted-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                Form Submitted.
              </motion.div>
            )}
          </div>
          <button 
            className="exit-button" 
            onClick={toggleModal}
          >
          <motion.div whileHover={{ scale: [1, 1.2] }}>
            <img src={images.exit} alt="Exit Button" className="exit-button-image" />
          </motion.div>
          </button>        
        </div>
      </motion.div>
    );
  };

export default ContactForm