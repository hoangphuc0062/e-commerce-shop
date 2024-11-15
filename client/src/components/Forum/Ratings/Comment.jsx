import { renderStarFromNumber } from "../../../ultils/helper";

const Comment = ({ avatar, name = "Ẩn Danh", star, comment }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <img
          src={avatar}
          alt="avatar"
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-4 border border-gray-300 py-2 bg-gray-100">
          <span className="flex items-center gap-1">
            <span className="font-semibold">Số Sao:</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold">Bình luận:</span>
            <span className="flex gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
