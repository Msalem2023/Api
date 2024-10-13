import React from 'react';

const Header = ({center,title,subtitle}) => {
  return (
    <div className={center? "text-center":"text-start"}>
            <div className="font-bold text-2xl">
                {title}

            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subtitle}
            </div>

        </div>
  );
}

export default Header;
