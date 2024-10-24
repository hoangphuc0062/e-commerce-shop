import HeadingSection from "../Heading/HeadingSection";
import PropTypes from 'prop-types';

function FeaturedPost({ data }) {
  return (
    <section className="mb-8">
      <HeadingSection title="Nổi bật nhất" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="relative rounded-lg overflow-hidden cursor-pointer h-full">
            <img
              src={data[0]?.thumbnail}
              alt={data[0]?.postTitle}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 ">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {data[0]?.postTitle}
              </h3>
              <p className="text-sm">
                {data[0]?.author} • {data[0]?.date}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-4 md:space-y-6">
            {data?.slice(1, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 md:space-x-6 cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded sm:w-24 sm:h-24 md:w-32 md:h-32"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold hover:text-main line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturedPost.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    postTitle: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};

export default FeaturedPost;
