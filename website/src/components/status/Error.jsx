import CANCEL from "../../assets/cancel.gif";
export default function Error() {
  return (
    <>
      <div className=" w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 ">
        <img src={CANCEL} alt="cancel" width={150} height={150} />
        <h1 className="text-red-500 font-bold text-xl">Thanh toán thất bại</h1>
      </div>
    </>
  );
}
