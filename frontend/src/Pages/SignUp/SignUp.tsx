import Button from "../../Components/extra/button";

const SignUp = () => {
  
  return (
    <form action="">
      <div className="bg-gray-200 absolute left-20 top-25 min-w-max h-2/3 w-96 rounded-md">
        <div className="flex justify-center items-center h-1/3 font-semibold text-2xl">
          SignUp
        </div>
        <div className="flex justify-center items-center flex-col gap-4 min-w-max">
          <input
            type="text"
            placeholder="hola"
            className=" bg-white rounded w-70 p-1"
          />
          <input
            type="text"
            placeholder="hola"
            className="bg-white rounded w-70 p-1"
          />
          <input
            type="text"
            placeholder="hola"
            className="bg-white rounded w-70 p-1"
          />
        </div>
        <div className="flex justify-center items-center mt-15 hover:font-semibold">
          <Button Title="SignUp" onClick={''} />
        </div>
      </div>
    </form>
  );
};

export default SignUp;
