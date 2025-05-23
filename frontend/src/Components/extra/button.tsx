import React from 'react';

interface ButtonProps {
  Title: string;
  onClick:() => void;
}

const Button: React.FC<ButtonProps> = ({Title, onClick}) => {
   return(
     <>
        <div>
            <button
                className=" bg-black text-white px-4 py-2 rounded  cursor-pointer"
                onClick={onClick}
            >
                {Title}
            </button>
        </div>
    </>
   )
}

export default Button;