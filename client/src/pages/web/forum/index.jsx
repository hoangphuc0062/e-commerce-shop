import { useState, useEffect } from "react";
import HeadingSection from "../../../components/Forum/HeadingSection";
import TopicCard from "../../../components/Forum/TopicCard";
import FeaturedPost from "../../../components/Forum/FeaturedPost";
import SliderPost from "../../../components/Forum/SliderPost";
import Sidebar from "../../../components/Forum/Sidebar";
import PostScroll from "../../../components/Forum/PostScroll";
import PostList from "../../../components/Forum/PostList";
import { Link } from "react-router-dom";

function ForumPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full pt-16">
      {/* Sidebar luôn hiển thị ở phía bên trái màn hình */}
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <Sidebar />
      </div>

      {/* Phần nội dung chính */}
      <div className="md:w-3/4 lg:w-4/5 w-full flex flex-col">
        <section className="flex-grow px-4">
          {/* Chủ đề hot */}
          <section className="mb-8">
            <HeadingSection title="Chủ Đề hot" />
            <TopicCard />
          </section>

          {/* Nổi bật nhất */}
          <section className="mb-8">
            <HeadingSection title="Nổi bật nhất" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full">
                <FeaturedPost />
              </div>
              <div className="space-y-4">{/* <SmallPost /> */}</div>
            </div>
          </section>
        </section>

        {/* Slider xem nhiều tuần qua */}
        <div>
          <section className="mb-8 p-4">
            <HeadingSection title="xem nhiều tuần qua" />
            <SliderPost />
          </section>
        </div>

        {/* Tin tức mới nhất và trending */}
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
                <HeadingSection title="S-NEWS cuối tuần" />
                <PostScroll />
              </div>
              <div>
                <HeadingSection title="khám phá - TRENDING" />
                <PostScroll />
              </div>
            </div>
          </div>
        </section>

        {/* Phần S-GAMES */}
        <section className="mb-8 px-4 bg-gray-200 border-2 w-full rounded-lg">
          <HeadingSection title="S-GAMES" />
          <SliderPost />
          <div className="mt-4 text-right">
            <Link
              to=""
              className="text-red-500 text-sm font-semibold hover:underline"
            >
              Xem thêm
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ForumPage;
