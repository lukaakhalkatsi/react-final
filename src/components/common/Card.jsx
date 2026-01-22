import { motion } from 'framer-motion';
import '../../styles/components/Card.scss';

const Card = ({
  children,
  className = '',
  onClick,
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      className={`card ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

