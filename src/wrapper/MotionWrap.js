import React from 'react';
import { motion } from 'framer-motion';

const MotionWrap = (Component, classNames) => function WrappedComponent(props) {
  return (
    <motion.div className={`${classNames} app__flex`}>
      <Component {...props} />
    </motion.div>
  );
};

export default MotionWrap;
