import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { GetBySlug, submitRating } from "../../../redux/slices/post";
import {
  Comment,
  HeadingSection,
  Sidebar,
  Votebar,
  VoteOption,
} from "../../../components/Forum";
import { formatDay, renderStarFromNumber } from "../../../ultils/helper";
import he from "he";
import { Box, Modal, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #1e40af",
  boxShadow: 24,
  p: 4,
};
const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const isLoginned = useSelector((state) => state.customer.isLoginned);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (!isLoginned) {
      Swal.fire({
        title: "Bạn cần đăng nhập!",
        text: "Vui lòng đăng nhập để thực hiện hành động này.",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
        confirmButtonColor: "#1e40af",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      setOpen(true);
    }
  };

  const handleSubmitRating = ({ comment, star }) => {
    if (!comment || !star || !data.id) {
      alert("Xin hãy điền đầy đủ thông tin");
      return;
    }

    // Dispatch the submitRating action with the necessary payload
    const payload = {
      postId: data.id,
      star,
      comment,
    };

    dispatch(submitRating(payload));
    alert("Cảm ơn bạn đã đánh giá!");

    handleClose();
  };
  // Lấy trạng thái và dữ liệu bài viết từ Redux
  const status = useSelector((state) => state.post.getBySlugStatus);
  const slugData = useSelector((state) => state.post.slugData);

  useEffect(() => {
    dispatch(GetBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (status === "success" && slugData) {
      setData({
        status: slugData?.status,
        id: slugData?._id,
        postTitle: slugData?.postTitle,
        shortDescription: slugData?.shortDescription,
        seoKeyWords: slugData?.seoKeyWords,
        content: slugData?.content,
        author: slugData?.author?.name || "Unknown",
        authorImageUrl:
          slugData?.author?.imageUrl || "/path/to/default-image.jpg",
        category: slugData?.category?.name || "Unknown",
        categorySlug: slugData?.category?.slug || "Unknown",
        rating: slugData?.rating,
        totalRating: slugData?.totalRating,
        slug: slugData?.slug,
        date: slugData?.createdAt,
        thumbnail: slugData?.thumbnail,
        tags: slugData?.tags?.map((tag) => tag.name) || [],
      });
    }
  }, [status, slugData]);
  if (status !== "success" || !data) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row w-full pt-16 container">
      <Helmet>
        <title>{data.postTitle}</title>
        <meta name="description" content={he.decode(data.shortDescription)} />
        <meta name="keywords" content={data.seoKeyWords} />
      </Helmet>
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <Sidebar />
      </div>
      <div className="md:w-3/4 lg:w-4/5 w-full">
        <div className="min-h-screen p-4">
          <div className="flex items-center mb-4 overflow-x-auto whitespace-nowrap">
            <span className="text-sm flex items-center text-main px-3">
              <FaArrowTrendUp className="mr-1" /> Xu hướng:
            </span>
            {/* Render trending tags dynamically if needed */}
            {data?.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/forum/tag/${tag}`}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-main hover:text-white transition-colors duration-300 cursor-pointer"
              >
                #{tag}
              </Link>
            ))}
          </div>
          {/* Đường dẫn breadcrumb */}
          <div className="text-sm mb-4 flex items-center gap-1 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="text-main">
              Trang chủ
            </Link>
            <p className="text-gray-600"> &raquo;</p>
            <Link
              to={`forum/category/${data?.categorySlug}`}
              className="text-gray-600"
            >
              {data?.category}
            </Link>
            <p className="text-gray-600"> &raquo;</p>
            <div className="text-gray-600 line-clamp-1">{data.postTitle}</div>
          </div>
          {/* Hình ảnh bài viết */}
          <div className="mb-6">
            <img
              src={data.thumbnail}
              alt={data.postTitle}
              className="w-full max-h-[400px] rounded-lg object-cover"
            />
          </div>
          <div className="blog-content">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block bg-main text-white px-3 py-1 rounded-full text-sm">
                {data.category}
              </div>
            </div>

            {/* Tiêu đề bài viết */}
            <h1 className="text-2xl font-semibold mb-4">{data.postTitle}</h1>

            {/* Thông tin tác giả và ngày đăng */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={data.authorImageUrl}
                  alt={data.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="text-sm">
                  <span className="block font-semibold">{data.author}</span>
                  <span className="block text-gray-500">
                    Ngày đăng: {formatDay(data.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="text-base text-gray-700 ">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </div>
          {/* Thẻ */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <span className="text-sm font-semibold mr-2 py-2">Thẻ:</span>
            {Array.isArray(data.tags) &&
              data.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/forum/tag/${tag}`}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center transition-colors duration-300 hover:bg-main hover:text-white"
                >
                  #{tag}
                </Link>
              ))}
          </div>
          <div className="flex p-4 flex-col">
            <HeadingSection title={`Bình luận bài viết`} />
            {/* Đánh giá bài viết */}
            <div className="flex">
              <div className="flex-4 flex items-center justify-center flex-col">
                <span>{`${data?.totalRating}/5`}</span>
                <span className="flex items-center gap-1">
                  {renderStarFromNumber(data?.totalRating)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </span>
              </div>

              <div className="flex-6 p-4 flex flex-col gap-2">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <Votebar
                      key={el}
                      number={el + 1}
                      ratingCount={
                        data?.rating.filter((item) => item.star === el + 1)
                          ?.length
                      }
                      ratingTotal={data?.rating?.length}
                    />
                  ))}
              </div>
            </div>
            <div className="p-4 flex items-center justify-center flex-col gap-2 text-sm">
              <span>Bạn thấy sao về bài viết này?</span>
              <Button onClick={handleOpen} variant="contained">
                Đánh giá
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Đánh giá bài viết
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <VoteOption
                      postTitle={data.postTitle}
                      handleSubmitRating={handleSubmitRating}
                    />
                  </Typography>
                </Box>
              </Modal>
            </div>
            <div className="flex flex-col gap-4">
              {data?.rating?.map((el) => (
                <Comment
                  key={el._id}
                  star={el.star}
                  comment={el.comment}
                  name={el.customer.name}
                  avatar={el.customer.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
