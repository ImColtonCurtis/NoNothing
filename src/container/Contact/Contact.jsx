import React, { useState, useEffect } from 'react';
import { images, videos } from '../../constants';
import { ContactForm } from '../../container';
import './Contact.scss';

const Contact = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    }
  
    useEffect(() => {
      // Set scroll position to the top of the page when the component mounts
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {  
      if (modal) {
        document.body.classList.add('active-modal');
      } else {
        document.body.classList.remove('active-modal');
      }
    }, [modal]);
  
    return (
      <div className="app__contact app_flex">
        <div className="app__contact-header">
          <div className="app__contact-video-player">
            <video 
            src={videos.contactHeader}
            autoPlay
            muted
            playsInline
            loop
            alt="Contact Header" 
            />
          </div>
        </div>
        <div className="app__contact-content-bg">
          <div className="app__contact-content-1">
            <div className="app__contact-section">
              <h1>Looking <span>for</span></h1>
              <h4>Something?</h4>
              <div className="app__contact-section-paragraph">
                <p className="app__contact-blurb">
                  Exploring our games or have a business proposition? We're here for it all!
                </p>
                <p className="app__contact-blurb">
                Send us your questions, comments, or elaborate fan fiction. Your input fuels our passion for creating immersive experiences, and we can't wait to connect with you in the gaming world!
                </p>
              </div>
              <button 
                className="app__contact-button" 
                onClick={() => {
                  toggleModal();
                }}
              >
                <img src={images.envelopeIcon} alt="More Info Logo" className="button-logo" />
                Contact Us
              </button>
            </div>          
          </div>
        </div>
        <div className="bottom-tag">
          <h3>
            For information and assistance regarding our company please contact contact@nonothing.net
          </h3>
        </div>
        {modal && (
          <div>
            <div onClick={toggleModal} className="form-overlay"></div>
            <ContactForm toggleModal={toggleModal} />
          </div>
        )}
      </div>
    );
  };

export default Contact