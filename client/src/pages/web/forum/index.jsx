import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  Sidebar,
  HeadingSection,
  TopicCard,
  FeaturedPost,
  SliderPost,
  PostTag,
  PostScroll,
} from "../../../components/Forum";

import { getPosts } from "../../../redux/slices/post";

function ForumPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(postData)) {
      setData(
        postData
          .map((item) => ({
            status: item.status,
            id: item._id,
            postTitle: item.postTitle,
            shortDescription: item.shortDescription,
            seoKeyWords: item.seoKeyWords,
            content: item.content,
            author: item.author?.name || "Unknown",
            category: item.category?.name || "Unknown",
            rating: item.rating,
            slug: item.slug,
            date: item.createdAt,
            thumbnail: item.thumbnail,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }
  }, [status, postData]);

  const uniqueCategories = [...new Set(data.map((item) => item.category))];

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

            {data && <FeaturedPost data={data} />}
          </section>

          {uniqueCategories.slice(0, 1).map((category) => (
            <section key={category} className="mb-8 p-4">
              <HeadingSection title={category} />
              {data && <SliderPost data={data} category={category} />}
            </section>
          ))}

          <PostScroll data={data} />

          <section className="mb-8 px-4 bg-gray-100 w-full rounded-lg">
            <HeadingSection title="S-GAMES" />
            {data && <SliderPost data={data} category={data?.category} />}
            <div className="mt-4 text-right">
              <Link
                to="#"
                className="text-main text-sm font-semibold hover:underline"
              >
                Xem thêm
              </Link>
            </div>
          </section>
          <section className="mb-8 p-4">
            <div className="flex overflow-x-auto space-x-4">
              {uniqueCategories.slice(0, 3).map((category) => (
                <PostTag key={category} category={category} data={data} />
              ))}
            </div>
          </section>

          <section className="mb-8 p-4">
            <HeadingSection title="thủ thuật - mẹo hay" />
            {data && <SliderPost data={data} category={data?.category} />}
          </section>

          <section className="mb-8 p-4">
            <HeadingSection title="Sự kiện" />
            {data && <SliderPost data={data} category={data?.category} />}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
