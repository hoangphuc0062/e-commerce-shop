/* eslint-disable  */
import SUCCESS from "../../assets/success.gif";
export default function Success({ mes }) {
  return (
    <>
      <div className=" w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 ">
        <img src={SUCCESS} alt="success" width={150} height={150} />
        <h1 className="text-gray-500 font-bold text-xl">{mes}</h1>
      </div>
    </>
  );
}
