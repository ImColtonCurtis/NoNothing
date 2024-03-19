import React from 'react';

const AppWrap = (Component, idName, classNames) => {
  return function WrappedComponent(props) {
    console.log(`WrappedComponent props:`, props); // Log the props

    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <div className="app__wrapper app__flex">
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default AppWrap;
