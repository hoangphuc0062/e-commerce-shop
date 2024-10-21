const ProfileUser = () => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <img
        src="https://cdn2.cellphones.com.vn/50x50,webp,q100/media/wysiwyg/Shipper_CPS3_1.png"
        alt="Avatar"
        className="w-16 h-16 rounded-full border"
      />
      <div>
        <h2 className="text-xl font-bold">NGUYỄN SỸ</h2>
        <p className="text-gray-500">0344484162</p>
        <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded">
          SNULL
        </span>
      </div>
    </div>
  );
};

export default ProfileUser;
