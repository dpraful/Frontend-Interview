import React from 'react';
import './CCard.css';

const CCard = ({
  children,
  image,
  imageStyle,
  style,
  padding = 20,
  radius = 15,
}) => {
  return (
    <div
      className="ccard"
      style={{
        padding: `${padding}px`,
        borderRadius: `${radius}px`,
        ...style,
      }}
    >
      {image && (
        <img
          src={image}
          alt="Card"
          className="ccard-image"
          style={imageStyle}
        />
      )}

      {children}
    </div>
  );
};

export default CCard;