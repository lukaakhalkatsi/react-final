import '../../styles/components/Loading.scss';

const Loading = ({ size = 'medium', text = '' }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner loading-spinner--${size}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;

