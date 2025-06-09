import React from 'react';

interface ButtonProps {
  Title: string;
}

const Button: React.FC<ButtonProps> = ({Title}) => {
   return(
     <>
        <div>
            <button
                className=" bg-black text-white px-4 py-2 rounded  cursor-pointer"
            >
                {Title}
            </button>
        </div>
    </>
   )
}

export default Button;