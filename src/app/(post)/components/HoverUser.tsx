import React, { useState } from 'react';
import UserPeakProfile from './UserPeakProfile';

interface HoverUserProps {
  username: string;
  avatar: string;
  karma: number;
  cakeDay: string;
  description?: string;
  children: React.ReactNode;
}

const HoverUser: React.FC<HoverUserProps> = ({
  username,
  avatar,
  karma,
  cakeDay,
  description,
  children
}) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowProfile(true)}
      onMouseLeave={() => setShowProfile(false)}
    >
      {children}
      {showProfile && (
        <div className="absolute top-full left-0 mt-2">
          <UserPeakProfile
            username={username}
            avatar={avatar}
            karma={karma}
            cakeDay={cakeDay}
            description={description}
          />
        </div>
      )}
    </div>
  );
};

export default HoverUser; 