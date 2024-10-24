import HeadingSection from "../../../components/Forum/HeadingSection";
import TopicCard from "../../../components/Forum/TopicCard";
import FeaturedPost from "../../../components/Forum/FeaturedPost";
import SliderPost from "../../../components/Forum/SliderPost";
import Sidebar from "../../../components/Forum/Sidebar";
import PostScroll from "../../../components/Forum/PostScroll";
import PostList from "../../../components/Forum/PostList";
import SmallPost from "../../../components/Forum/SmallPost";
import PostTag from "../../../components/Forum/PostTag";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../../redux/slices/post";


function ForumPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.postReducer.status);
  const postData = useSelector((state) => state.postReducer.data);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  useEffect(() => {
    if (status === "success" && Array.isArray(postData)) {
      setData(
        postData.map((item) => ({
          status: item.status,
          id: item._id,
          postTitle: item.postTitle,
          shortDescription: item.shortDescription,
          seoKeyWords: item.seoKeyWords,
          content: item.content,
          author: item.author?.name || "Unknown",
          category: item.category,
          rating: item.rating,
          slug: item.slug,
          date: item.createdAt,
          thumbnail: item.thumbnail
        }))
      );
    }
  }, [status, postData]);
  
  



  return (
    <div className="container w-full">
      <div className="flex flex-col md:flex-row w-full pt-16">
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
          <Sidebar />
        </div>

        <div className="md:w-3/4 lg:w-4/5 w-full flex flex-col ">
          <section className="flex-grow px-4">
            <section className="mb-8">
              <HeadingSection title="Chủ Đề hot" />
              <TopicCard />
            </section>

            <section className="mb-8">
              <HeadingSection title="Nổi bật nhất" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full">
                  <FeaturedPost />
                </div>
                <div className="space-y-4">
                  <SmallPost />
                </div>
              </div>
            </section>
          </section>

          <section className="mb-8 p-4">
            <HeadingSection title="xem nhiều tuần qua" />
            {
              data && (
                <SliderPost category="S-Games" data={data} />
              )
            }
          </section>

          <section className="mb-8 p-4"> 
            <div className="md:flex md:space-x-8">
              <div className="md:w-1/2">
                <HeadingSection title="tin tức mới nhất" />
                <div className="space-y-4">
                  <PostList />
                </div>
              </div>
              <div className="md:w-1/2 space-y-8">
                <div>
                  <PostScroll />
                </div>
                <div>
                  <HeadingSection title="khám phá - TRENDING" />
                  <PostScroll />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8 px-4 bg-gray-100 w-full rounded-lg">
            <HeadingSection title="S-GAMES" />
            <SliderPost category="S-Games" />
            <div className="mt-4 text-right">
              <Link
                to=""
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Xem thêm
              </Link>
            </div>
          </section>
          <section className="mb-8 p-4">
            <div className="flex overflow-x-auto space-x-4">
              <PostTag category="Trên Tay" />
              <PostTag category="Tin Công Nghệ" />
              <PostTag category="Đánh Giá" />
            </div>
          </section>

          <section className="mb-8 p-4">
            <HeadingSection title="thủ thuật - mẹo hay" />
            <SliderPost category="Thủ Thuật - Mẹo Hay" />
          </section>

          <section className="mb-8 p-4">
            <HeadingSection title="Sự kiện" />
            <SliderPost category="Sự Kiện" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
