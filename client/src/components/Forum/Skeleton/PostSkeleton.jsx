import { Skeleton } from "@mui/material";

const PostSkeleton = () => (
  <div className="bg-white overflow-hidden flex py-4 w-full">
    <Skeleton
      variant="rectangular"
      width="30%" // Tùy chỉnh phần trăm chiều rộng cho hình ảnh
      height={128}
      className="rounded-lg object-cover"
    />
    <div className="pl-4 w-full flex flex-col justify-between">
      <div>
        <Skeleton variant="text" width="80%" height={24} className="mb-2" />
        <Skeleton variant="text" width="90%" height={20} className="mb-2" />
        <Skeleton variant="text" width="70%" height={20} className="mb-4" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" width="20%" height={20} />
      </div>
    </div>
  </div>
);

export default PostSkeleton;
