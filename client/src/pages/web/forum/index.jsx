import { useState, useEffect } from "react";
import HeadingSection from "../../../components/Forum/HeadingSection";
import TopicCard from "../../../components/Forum/TopicCard";
import FeaturedPost from "../../../components/Forum/FeaturedPost";
import SmallPost from "../../../components/Forum/SmallPost";
import icons from "../../../ultils/icon";
import SliderPost from "../../../components/Forum/SliderPost";
import SideBar from "../../../components/Forum/SideBar";
import PostScroll from "../../../components/Forum/PostScroll";
import PostList from "../../../components/Forum/PostList";

function ForumPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div
        className={`md:w-1/4 ${isMobileMenuOpen ? "block" : "hidden"} md:block`}
      >
        <SideBar />
      </div>

      <div className="md:w-3/4 w-full">
        {windowWidth < 768 && (
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-full bg-gray-200 p-2 mb-4 flex items-center justify-center"
          >
            <icons.AiOutlineUnorderedList className="mr-2" />
            {isMobileMenuOpen ? "Đóng danh mục" : "Mở danh mục"}
          </button>
        )}
        <section className="flex-grow px-4">
          <section className="mb-8">
            <HeadingSection title="CHỦ ĐỀ HOT" />
            <TopicCard />
          </section>
          <section className="mb-8">
            <HeadingSection title="NỔI BẬT NHẤT" />
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
        <div>
          <section className="mb-8 p-4">
            <HeadingSection title="XEM NHIỀU TUẦN QUA" />
            <SliderPost />
          </section>
        </div>
        <section className="mb-8 p-4">
          <div className="flex space-x-8">
            <div className="w-1/2">
              <HeadingSection title="TIN TỨC MỚI NHẤT" />
              <div className="space-y-4">
                <PostList />
              </div>
             
            </div>
            <div className="w-1/2 space-y-8">
              <div>
                <HeadingSection title="S-NEWS CUỐI TUẦN" />
                <PostScroll />
              </div>
              <div>
                <HeadingSection title="KHÁM PHÁ - TRENDING" />
                <PostScroll />
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8 px-4 bg-gray-200 border-2 w-full rounded-lg">
          <HeadingSection title="S-GAMES" />
          <SliderPost />
          <div className="mt-4 text-right">
            <a href="#" className="text-red-500 text-sm font-semibold hover:underline">
              Xem thêm
            </a>
          </div>  
        </section>
      </div>
    </div>
  );
}
export default ForumPage;
