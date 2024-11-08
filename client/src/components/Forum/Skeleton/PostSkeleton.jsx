import { Skeleton } from "@mui/material";

const PostSkeleton = () => (
  <div className="bg-white overflow-hidden flex py-4">
    <Skeleton
      variant="rectangular"
      width={144}
      height={128}
      className="rounded-lg"
    />
    <div className="pl-4 w-3/4">
      <Skeleton variant="text" width="75%" height={24} />
      <Skeleton variant="text" width="50%" height={20} />
      <Skeleton variant="text" width="40%" height={20} />
      <div className="flex space-x-2 mt-2">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" width="25%" height={20} />
      </div>
    </div>
  </div>
);

export default PostSkeleton;
    