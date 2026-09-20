import React, { ReactNode } from 'react';
import './CCard.css';

interface CCardProps {
  children?: ReactNode;
  image?: string;
  imageStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  padding?: number;
  radius?: number;
}

const CCard: React.FC<CCardProps> = ({
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
      {/* Optional Image */}
      {image && (
        <img
          src={image}
          alt="Card"
          className="ccard-image"
          style={imageStyle}
        />
      )}

      {/* Card Content */}
      {children}
    </div>
  );
};

export default CCard;
