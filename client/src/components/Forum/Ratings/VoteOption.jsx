import { useState } from "react";
import { voteOptions } from "../../../ultils/contain";
import icons from "../../../ultils/icon";

const VoteOption = ({ postTitle, handleSubmitRating }) => {
  const { FaStar } = icons;
  const [chooseStar, setChooseStar] = useState(null);
  const [comment, setComment] = useState("");
  return (
    <div className="p-4 flex items-center justify-center flex-col gap-4">
      <div className="flex">
        <img
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:100:100/q:90/plain/https://cellphones.com.vn/media/wysiwyg/cps-ant.png"
          alt="rating"
          className="w-20 h-20 object-contain"
        />
        <span className="text-lg pl-2 text-gray-500 line-clamp-2">
          {postTitle}
        </span>
      </div>
      <textarea
        cols="30"
        rows="10"
        className="w-full h-40 border-2 border-gray-300 rounded-md p-2 resize-none focus:outline-main text-sm"
        placeholder="Nhập đánh giá của bạn (Tối thiểu 15 ký tự)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p className="text-sm text-gray-500 text-start">
          Bạn cảm thấy bài viết này như thế nào?
        </p>
        <div className="flex justify-center items-center gap-4">
          {voteOptions.map((el) => (
            <div
              key={el.id}
              className="w-[100px] h-[100px] flex items-center justify-center flex-col gap-2 bg-gray-100 p-4 rounded-md cursor-pointer"
              onClick={() => setChooseStar(el.id)}
            >
              {Number(chooseStar) && chooseStar >= el.id ? (
                <FaStar color="yellow" />
              ) : (
                <FaStar color="gray" />
              )}
              <span className="text-[12px]">{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="w-full bg-main text-white p-2 rounded-md"
        onClick={() => handleSubmitRating({ comment, star: chooseStar })}
      >
        Gửi đánh giá
      </button>
    </div>
  );
};

export default VoteOption;
