import React, { useState, useEffect } from 'react';
import { images, videos } from '../../constants';
import { SupportForm } from '../../container';
import './Support.scss';

const Support = () => {
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
      <div className="app__support app_flex">
        <div className="app__support-header">
          <div className="app__support-video-player">
            <video 
              src={videos.supportHeader}
              autoPlay
              muted
              playsInline
              loop
              alt="Playtest Header" 
            />
          </div>
        </div>
        <div className="app__support-content-bg">
          <div className="app__support-content-1">
            <div className="app__support-section">
              <h1>Get Help <span>with</span></h1>
              <h4>Technical Issues</h4>
              <div className="app__support-section-paragraph">
                <p className="app__support-blurb">
                  We understand that technical issues or bugs can sometimes disrupt your gaming experience. Our dedicated support team is here to assist you!
                </p>
                <p className="app__support-blurb">
                  If you've encountered any challenges while playing our game, please don't hesitate to reach out. Your feedback is invaluable, and we're committed to resolving any issues you may have swiftly. Together, let's ensure you have the best gaming experience possible. Contact our support team, and we'll work closely with you to address and resolve any concerns you may encounter. Happy gaming!
                </p>
              </div>
              <button 
                className="app__support-button" 
                onClick={() => {
                  toggleModal();
                }}
              >
              <img src={images.pencilIcon} alt="More Info Logo" className="button-logo" />
              OPEN TICKET
              </button>
            </div>          
          </div>
        </div>
        <div className="bottom-tag">
          <h3>
          For further support and assistance regarding our games please contact support@nonothing.net
          </h3>
        </div>
        {modal && (
          <div>
            <div onClick={toggleModal} className="form-overlay"></div>
            <SupportForm toggleModal={toggleModal} />
          </div>
        )}
      </div>
    );
  };

export default Support