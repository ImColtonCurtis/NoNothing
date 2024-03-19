import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import './SupportForm.scss';

const SupportForm = ({ toggleModal }) => {
    const [supportFormName, setSupportFormName] = useState(sessionStorage.getItem('supportFormName') || '');  
    const [isValidSupportFormName, setValidSupportFormName] = useState(true);
  
    const [supportFormEmail, setSupportFormEmail] = useState(sessionStorage.getItem('supportFormEmail') || '');  
    const [isValidSupportFormEmail, setValidSupportFormEmail] = useState(true);
  
    const [supportFormBugtopic, setSupportFormBugtopic] = useState(sessionStorage.getItem('supportFormBugtopic') || '');  
    const [isValidSupportFormBugtopic, setValidSupportFormBugtopic] = useState(true);
  
    const [supportFormBugDetails, setSupportFormBugDetails] = useState(sessionStorage.getItem('supportFormBugDetails') || '');  
    const [isValidSupportFormBugDetails, setValidSupportFormBugDetails] = useState(true);
  
    const [selectedGame, setSelectedGame] = useState(sessionStorage.getItem('selectedGame') || '');
    const [isValidGame, setValidGame] = useState(true);
  
    const [isSupportFormSubmitted, setSupportFormSubmitted] = useState(false);
    
    const handleGameChange = (e) => {
      setSelectedGame(e.target.value);
      setValidGame(true); // Reset validation status when selecting an option
      sessionStorage.setItem('selectedGame', e.target.value);
    };
  
    useEffect(() => {
      // Check sessionStorage to see if the user has submitted an email
      const storedSubmittedStatus = sessionStorage.getItem('isSupportFormSubmitted');
      if (storedSubmittedStatus) {
        setSupportFormSubmitted(true);
      }
    }, []);
  
    const handleSubmit = () => {
      // Perform validation logic here
      // Perform email validation
      const isNameValid = validateSupportFormName(supportFormName);
      const isEmailValid = validateSupportFormEmail(supportFormEmail);
      const isBugtopicValid = validateSupportFormBugtopic(supportFormBugtopic);
      const isBugDetailsValid = validateSupportFormBugDetails(supportFormBugDetails);
  
      // Validate selectedGame
      const isGameSelected = !!selectedGame;
      setValidGame(isGameSelected);
  
      if (isNameValid)
        setValidSupportFormName(true);
      else
        setValidSupportFormName(false);
  
      if (isEmailValid)
        setValidSupportFormEmail(true);
      else
        setValidSupportFormEmail(false);
  
      if (isBugtopicValid)
        setValidSupportFormBugtopic(true);
      else
        setValidSupportFormBugtopic(false);
  
      if (isBugDetailsValid)
        setValidSupportFormBugDetails(true);
      else
        setValidSupportFormBugDetails(false);
  
      if (isGameSelected  && isNameValid && isEmailValid && isBugtopicValid && isBugDetailsValid) {
        setSupportFormSubmitted(true);
  
        // Store the submitted status in sessionStorage
        sessionStorage.setItem('isSupportFormSubmitted', 'true');
      }
    };
  
    const validateSupportFormName = (supportFormName) => {
      // Check if the name is not empty
      if (!supportFormName.trim()) {
        return false;
      }
  
      // Check if the name contains only letters and spaces
      const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
      if (!nameRegex.test(supportFormName)) {
        return false;
      }
  
      // Check if the name has a minimum and maximum length
      const minLength = 2;
      const maxLength = 50;
      if (supportFormName.length < minLength || supportFormName.length > maxLength) {
        return false;
      }
  
      // Check if there are no consecutive spaces
      if (/(\s{2,})/.test(supportFormName)) {
        return false;
      }
  
      // Check if the name doesn't start or end with a space
      if (supportFormName.startsWith(' ') || supportFormName.endsWith(' ')) {
        return false;
      }
    
      return true;
    };
  
    const validateSupportFormEmail = (supportFormEmail) => {
      // Basic email validation (contains '@' symbol and '.')
      if (!supportFormEmail.includes('@') || !supportFormEmail.includes('.')) {
        return false;
      }
    
      // Check for a valid position of '@'
      if (supportFormEmail.indexOf('@') <= 0) {
        return false;
      }
    
      // Check for consecutive dots
      if (/(\.{2,})/.test(supportFormEmail)) {
        return false;
      }
    
      // Check if the domain has at least one '.' after '@'
      const domainParts = supportFormEmail.split('@')[1].split('.');
      if (domainParts.length < 2) {
        return false;
      }
    
      return true;
    };
  
    const validateSupportFormBugtopic = (supportFormBugtopic) => {
      // Check if the name is not empty
      if (!supportFormBugtopic.trim()) {
        return false;
      }
    
      return true;
    };
  
    const validateSupportFormBugDetails = (supportFormBugDetails) => {
      // Check if the name is not empty
      if (!supportFormBugDetails.trim()) {
        return false;
      }
    
      return true;
    };
    
    return (
      <motion.div 
        className="app__supportForm app__flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >      
        <div className="app__supportForm-container">
          <div className="app__supportForm-content">
            {!isSupportFormSubmitted ? (
              <motion.div
                className="app__supportForm-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h1>Bug Ticket</h1>
                <div className="custom-dropdown top-dropdown">
                  <select 
                    value={selectedGame} 
                    onChange={handleGameChange}
                    style={{ 
                      borderColor: selectedGame.trim() ? (isValidGame ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                    }}
                  >
                    <option value="" disabled>
                      Select A Game
                    </option>
                    <option value="Endless Golf">Endless Golf</option>    
                    <option value="Super Donkey Balls">Super Donkey Balls</option>
                    <option value="Tube Warp">Tube Racers</option>
                  </select>
                  <div className="form-dropdown-icon">
                    <img src={images.dropDownTriangle} alt="dropdown triangle" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={supportFormName}
                  onChange={(e) => {
                    setSupportFormName(e.target.value);
                    setValidSupportFormName(true); // Reset validation status when typing
                    sessionStorage.setItem('supportFormName', e.target.value);
                  }}
                  style={{ 
                    borderColor: supportFormName.trim() ? (isValidSupportFormName ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                />
                <input
                  type="text"
                  placeholder="Your Email"
                  value={supportFormEmail}
                  onChange={(e) => {
                    setSupportFormEmail(e.target.value);
                    setValidSupportFormEmail(true); // Reset validation status when typing
                    sessionStorage.setItem('supportFormEmail', e.target.value);
                  }}
                  style={{ 
                    borderColor: supportFormEmail.trim() ? (isValidSupportFormEmail ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                />
                <input
                  type="text"
                  placeholder="Bug Topic"
                  value={supportFormBugtopic}
                  onChange={(e) => {
                    setSupportFormBugtopic(e.target.value);
                    setValidSupportFormBugtopic(true); // Reset validation status when typing
                    sessionStorage.setItem('supportFormBugtopic', e.target.value);
                  }}
                  className="input-textarea" // Apply the class here
                  style={{ 
                    borderColor: supportFormBugtopic.trim() ? (isValidSupportFormBugtopic ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                />
                <input
                  type="text"
                  placeholder="Message: Explain Your Bug"
                  className="bottom-field"
                  value={supportFormBugDetails}
                  onChange={(e) => {
                    setSupportFormBugDetails(e.target.value);
                    setValidSupportFormBugDetails(true); // Reset validation status when typing
                    sessionStorage.setItem('supportFormBugDetails', e.target.value);
                  }}
                  style={{ 
                    borderColor: supportFormBugDetails.trim() ? (isValidSupportFormBugDetails ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}                
                />
  
                <button
                  onClick={handleSubmit}
                  style={{
                    cursor: selectedGame && isValidGame && supportFormName && isValidSupportFormName && supportFormEmail && isValidSupportFormEmail && supportFormBugtopic && isValidSupportFormBugtopic && supportFormBugDetails && isValidSupportFormBugDetails ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!selectedGame || !isValidGame || !supportFormName || !isValidSupportFormName || !supportFormEmail || !isValidSupportFormEmail || !supportFormBugtopic || !isValidSupportFormBugtopic || !supportFormBugDetails || !isValidSupportFormBugDetails}
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
                Bug Submitted.
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

export default SupportForm