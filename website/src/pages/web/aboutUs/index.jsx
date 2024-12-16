import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import { FiMail, FiSend } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";

const statistics = [
  {
    value: "180",
    label: "Đánh giá tích cực",
    color: "text-blue-600",
    icon: "👥",
  },
  { value: "100+", label: "Sản phẩm", color: "text-orange-500", icon: "🛍️" },
  { value: "5+", label: "Thành viên", color: "text-green-500", icon: "👤" },
];

const reviews = [
  {
    name: "Nguyễn Dương Hoàng Phúc",
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2Frz4TU%2FMAGKcJrz4TU%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAIfvgo70BIKD5cSdMq4adxhyoWyjsGfcXrv41FVE4SIp&exp=1734339035&osig=AAAAAAAAAAAAAAAAAAAAACgvjPuc1fRhhsxsGzf0t2yu8KMYMuk1DA00OokNuUpv&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Trương Công Đức",
    image:
      "https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F3cJtc%2FMAGYkp3cJtc%2F1%2Fp.png/watermark:F/width:138?csig=AAAAAAAAAAAAAAAAAAAAAD3sohkp6kWUn4WMjw5MPOi1SvugdQFXzwUS7syl2Re2&exp=1734338251&osig=AAAAAAAAAAAAAAAAAAAAAJ8Am87oIBRXxmbNeW1H38hQafurGZl2QFVMZQWWuuu1&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Nguyễn Ngọc Thái",
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2Fu5Qg4%2FMAGKcHu5Qg4%2F1%2Fp.jpg/watermark:F/width:116?csig=AAAAAAAAAAAAAAAAAAAAAA2t09h_WHqzjrJ6wYG9lXI1FitI56nzh3qtTd6RGoKJ&exp=1734340356&osig=AAAAAAAAAAAAAAAAAAAAAPIEv31uYwWSHjq19BxM0o5CRP1KRujxFd9jR2Hz3Lyp&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Nguyễn Văn Sỹ",
    image:
      "https://media.canva.com/v2/image-resize/format:PNG/height:141/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FdvqsM%2FMAGYkjdvqsM%2F1%2Fp.png/watermark:F/width:121?csig=AAAAAAAAAAAAAAAAAAAAAEko-4SGXpl-vi7w5JhaPZRLWfqnuDIkIWQiOyXE--XW&exp=1734338293&osig=AAAAAAAAAAAAAAAAAAAAAJuU692_MRiBJODHDVamQYEM-a59fOdMkKuWS8AIegWx&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Phạm Vinh Quang",
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FuNNPg%2FMAGKcNuNNPg%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAACFGAvtagRPc4RV23lk3C-1JOY1ZxlcSVWSXMhXgwcJd&exp=1734338856&osig=AAAAAAAAAAAAAAAAAAAAAAuovr1rfs5CGFvLcZ-Cbf7Gln2aCfE3T3cXh2ZIk2M-&signer=media-rpc&x-canva-quality=thumbnail",
  },
];

const reviewText = [
  "Tôi rất hài lòng với trải nghiệm của mình và sẽ quay lại trang web này mỗi khi thú cưng của tôi cần chăm sóc.",
  "Dịch vụ chăm sóc rất tận tình và chuyên nghiệp, tôi hoàn toàn yên tâm.",
  "Trang web cung cấp các dịch vụ tuyệt vời, dễ dàng sử dụng và tiện lợi.",
  "Sản phẩm chất lượng cao, nhân viên thân thiện và giúp đỡ nhiệt tình.",
  "Rất hài lòng với sự hỗ trợ khách hàng, tôi sẽ giới thiệu cho bạn bè của mình.",
];

const teamMembers = [
  {
    name: "Nguyễn Dương Hoàng Phúc (Leader)",
    role: "Người tài giỏi và siêng năng là người dẫn đường, không chỉ đạt thành công mà còn truyền cảm hứng cho đội ngũ.",
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2Frz4TU%2FMAGKcJrz4TU%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAIfvgo70BIKD5cSdMq4adxhyoWyjsGfcXrv41FVE4SIp&exp=1734339035&osig=AAAAAAAAAAAAAAAAAAAAACgvjPuc1fRhhsxsGzf0t2yu8KMYMuk1DA00OokNuUpv&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Trương Công Đức",
    role: "Người siêng năng chịu khó sẽ biến nỗ lực thành thành công và ước mơ thành hiện thực.",
    image:
      "https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F3cJtc%2FMAGYkp3cJtc%2F1%2Fp.png/watermark:F/width:138?csig=AAAAAAAAAAAAAAAAAAAAAD3sohkp6kWUn4WMjw5MPOi1SvugdQFXzwUS7syl2Re2&exp=1734338251&osig=AAAAAAAAAAAAAAAAAAAAAJ8Am87oIBRXxmbNeW1H38hQafurGZl2QFVMZQWWuuu1&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Nguyễn Ngọc Thái",
    role: "Sự siêng năng và chịu khó trong công việc chính là chìa khóa mở cánh cửa thành công.",
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2Fu5Qg4%2FMAGKcHu5Qg4%2F1%2Fp.jpg/watermark:F/width:116?csig=AAAAAAAAAAAAAAAAAAAAAA2t09h_WHqzjrJ6wYG9lXI1FitI56nzh3qtTd6RGoKJ&exp=1734340356&osig=AAAAAAAAAAAAAAAAAAAAAPIEv31uYwWSHjq19BxM0o5CRP1KRujxFd9jR2Hz3Lyp&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Nguyễn Văn Sỹ",
    role: "Cố gắng mà không đúng cách chỉ khiến bạn mệt mỏi, chứ không đưa bạn đến thành công.",
    image:
      "https://media.canva.com/v2/image-resize/format:PNG/height:141/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FdvqsM%2FMAGYkjdvqsM%2F1%2Fp.png/watermark:F/width:121?csig=AAAAAAAAAAAAAAAAAAAAAEko-4SGXpl-vi7w5JhaPZRLWfqnuDIkIWQiOyXE--XW&exp=1734338293&osig=AAAAAAAAAAAAAAAAAAAAAJuU692_MRiBJODHDVamQYEM-a59fOdMkKuWS8AIegWx&signer=media-rpc&x-canva-quality=thumbnail",
  },
  {
    name: "Phạm Vinh Quang",
    role: "Kẻ lười biếng luôn tìm lý do để không làm việc, trong khi người chăm chỉ luôn tìm cách để hoàn thành nó",
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FuNNPg%2FMAGKcNuNNPg%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAACFGAvtagRPc4RV23lk3C-1JOY1ZxlcSVWSXMhXgwcJd&exp=1734338856&osig=AAAAAAAAAAAAAAAAAAAAAAuovr1rfs5CGFvLcZ-Cbf7Gln2aCfE3T3cXh2ZIk2M-&signer=media-rpc&x-canva-quality=thumbnail",
  },
];

export default function AboutUs() {
  const [swiper, setSwiper] = useState(null);
  const [currentText, setCurrentText] = useState(reviewText[0]);

  const handleClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentText(reviewText[swiper.activeIndex]);
  };

  const [openAnswer, setOpenAnswer] = useState(null);

  const toggleAnswer = (index) => {
    setOpenAnswer(openAnswer === index ? null : index);
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Reset error khi người dùng thay đổi email
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra email có hợp lệ không
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      if (!email.includes("@")) {
        setError("Vui lòng bao gồm '@' trong địa chỉ email.");
      } else {
        setError("Vui lòng điền vào trường này.");
      }
    } else {
      setError("");
      // Gửi email (ví dụ: gọi API gửi email)
      console.log("Đăng ký thành công với email:", email);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative bg-gray-800 text-white py-16 w-full">
        <img
          src="https://i.pinimg.com/550x/d7/60/aa/d760aa5c954aa6c6b8f2bd08f5c2c508.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold mb-2">Giới thiệu</h1>
          <p className="text-gray-200">Trang chủ / Giới thiệu</p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trung tâm chăm sóc khách hàng
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Trung tâm chăm sóc khách hàng là nơi cung cấp hỗ trợ, giải đáp thắc
            mắc và xử lý các vấn đề liên quan đến sản phẩm hoặc dịch vụ. Các
            dịch vụ chính bao gồm hỗ trợ kỹ thuật, giải đáp thắc mắc, tiếp nhận
            phản hồi và khiếu nại, qua các kênh như điện thoại, email, chat trực
            tuyến. Trung tâm này giúp duy trì mối quan hệ lâu dài với khách hàng
            và nâng cao uy tín của công ty.
          </p>
          <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl hover:bg-orange-500 transition-all duration-300">
            Khám phá
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://kbeauty.fpt.edu.vn/wp-content/uploads/2021/01/KB_Spa.jpg"
            alt="Pet Care"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="flex justify-center flex-wrap gap-8 py-12 ">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="flex items-center p-6 border rounded-lg shadow-md bg-white w-64 sm:w-80 md:w-96"
          >
            <div className="text-4xl mr-4">{stat.icon}</div>
            <div className="text-center">
              <h3 className={`text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Customer Reviews */}
      <section className="py-12 px-6 bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col md:flex-row items-center gap-8 rounded-lg shadow-lg">
        <div className="flex-1 md:w-1/2">
          <div className="bg-blue-600 text-white p-10 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105">
            <h2 className="text-4xl font-bold mb-6">Đánh giá của khách hàng</h2>
            <div className="flex justify-center flex-wrap mb-6 space-x-2">
              {reviews.map((review, index) => (
                <img
                  key={index}
                  src={review.image} // Dùng ảnh từ đối tượng reviews
                  alt={`Avatar of ${review.name}`} // Sử dụng tên để cải thiện SEO
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl mb-6 font-semibold leading-relaxed">
              {currentText}
            </h3>
            <Swiper
              modules={[Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              onSwiper={setSwiper}
              onSlideChange={handleSlideChange}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <p className="font-semibold text-lg">- {review.name}</p>{" "}
                  {/* Sử dụng tên đúng */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right div (image) */}
        <div className="flex-1 md:w-1/2">
          <img
            src="https://subiz.com.vn/blog/wp-content/uploads/2024/06/khac-biet-giua-khao-sat-va-y-kien-phan-hoi-e1719229048287.jpg"
            alt="Customer"
            className="rounded-lg shadow-lg w-full object-cover transition-transform transform hover:scale-105"
          />
        </div>
      </section>

      <section className="py-16 px-8 bg-white shadow-lg rounded-lg mb-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Dịch vụ chăm sóc khách hàng
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Phần chứa ảnh và danh sách */}
          <div className="flex flex-col items-center md:flex-row gap-10">
            <div className="flex-shrink-0">
              <img
                src="https://nupet.vn/wp-content/uploads/2023/10/anh-avatar-cute-meo-nupet-5.jpg"
                alt="Chăm sóc thú cưng"
                className="rounded-full shadow-lg w-32 h-32 object-cover transition-transform transform hover:scale-105"
              />
            </div>
            <ul className="md:w-1/2 text-gray-700 space-y-4 whitespace-nowrap">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Chứng nhận và
                đánh giá
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Niềm tin và uy
                tín
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Chuyên gia chuyên
                nghiệp
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Thanh toán an
                toàn
              </li>
            </ul>
          </div>
          <div className="mt-8 text-center max-w-md mx-auto">
            <p className="text-lg font-semibold text-gray-800">
              Chăm sóc khách hàng
            </p>
            <div className="flex items-center justify-center mt-2">
              <div
                className="w-full bg-gray-200 rounded-full h-2"
                style={{ height: "16px" }}
              >
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: "70%", height: "16px" }}
                ></div>
              </div>
              <span className="ml-2 text-gray-600">70%</span>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Các câu hỏi thường gặp
          </h2>
          <div className="space-y-4">
            {/* Câu hỏi 1 */}
            <div className="border rounded-lg p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(0)}
              >
                <h3 className="font-semibold">
                  Các sản phẩm điện tử của bạn có bảo hành không?
                </h3>
                <span className="text-xl">{openAnswer === 0 ? "-" : "+"}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openAnswer === 0 ? "max-h-40" : "max-h-0"
                }`}
              >
                {openAnswer === 0 && (
                  <p className="mt-2">
                    Có, tất cả các sản phẩm điện tử mà chúng tôi cung cấp đều đi
                    kèm với chế độ bảo hành từ 6 tháng đến 2 năm, tùy theo từng
                    sản phẩm. Bạn có thể tham khảo chi tiết về bảo hành trên
                    trang sản phẩm.
                  </p>
                )}
              </div>
            </div>

            {/* Câu hỏi 2 */}
            <div className="border rounded-lg p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(1)}
              >
                <h3 className="font-semibold">
                  Làm thế nào để đặt mua sản phẩm trên trang web của bạn?
                </h3>
                <span className="text-xl">{openAnswer === 1 ? "-" : "+"}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openAnswer === 1 ? "max-h-40" : "max-h-0"
                }`}
              >
                {openAnswer === 1 && (
                  <p className="mt-2">
                    Bạn có thể dễ dàng đặt mua sản phẩm bằng cách thêm sản phẩm
                    vào giỏ hàng và tiến hành thanh toán thông qua các phương
                    thức thanh toán trực tuyến an toàn mà chúng tôi hỗ trợ, bao
                    gồm thẻ tín dụng, chuyển khoản ngân hàng và thanh toán khi
                    nhận hàng.
                  </p>
                )}
              </div>
            </div>

            {/* Câu hỏi 3 */}
            <div className="border rounded-lg p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(2)}
              >
                <h3 className="font-semibold">
                  Trang web của bạn có cung cấp dịch vụ giao hàng miễn phí
                  không?
                </h3>
                <span className="text-xl">{openAnswer === 2 ? "-" : "+"}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openAnswer === 2 ? "max-h-40" : "max-h-0"
                }`}
              >
                {openAnswer === 2 && (
                  <p className="mt-2">
                    Có, chúng tôi cung cấp dịch vụ giao hàng miễn phí cho các
                    đơn hàng có giá trị từ 1 triệu đồng trở lên trong khu vực
                    nội thành. Đối với các đơn hàng nhỏ hơn, phí giao hàng sẽ
                    được tính thêm và được thông báo khi thanh toán.
                  </p>
                )}
              </div>
            </div>

            {/* Câu hỏi 4 */}
            <div className="border rounded-lg p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(3)}
              >
                <h3 className="font-semibold">
                  Tôi gặp vấn đề với sản phẩm, làm thế nào để yêu cầu hỗ trợ?
                </h3>
                <span className="text-xl">{openAnswer === 3 ? "-" : "+"}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openAnswer === 3 ? "max-h-40" : "max-h-0"
                }`}
              >
                {openAnswer === 3 && (
                  <p className="mt-2">
                    Nếu gặp bất kỳ vấn đề nào với sản phẩm, bạn có thể liên hệ
                    với trung tâm hỗ trợ khách hàng qua số điện thoại hoặc email
                    của chúng tôi để yêu cầu hỗ trợ hoặc đổi trả sản phẩm trong
                    vòng 7 ngày sau khi nhận hàng.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-gray-100 py-16 mb-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gặp gỡ các thành viên nhóm
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.slice(0, 2).map((member, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-lg shadow-lg p-6 w-64 sm:w-80 md:w-96 transition-transform transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 shadow-md"
              />
              <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
              <p className="text-gray-600 italic">{member.role}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-10 mt-8">
          {teamMembers.slice(2, 5).map((member, index) => (
            <div
              key={index + 2}
              className="text-center bg-white rounded-lg shadow-lg p-6 w-64 sm:w-80 md:w-96 transition-transform transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 shadow-md"
              />
              <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
              <p className="text-gray-600 italic">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-yellow-400 rounded-lg py-6 px-8 shadow-xl mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Phần tiêu đề và icon */}
          <div className="flex items-center mb-4 md:mb-0">
            <FiMail className="text-white text-4xl mr-4" />
            <h2 className="text-white text-lg md:text-xl font-semibold leading-tight">
              Đăng ký ngay để nhận tin tức mới nhất.
            </h2>
          </div>

          {/* Phần input và nút gửi */}
          <div className="flex items-center w-full md:w-auto mt-4 md:mt-0 relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Địa chỉ email..."
              className={`bg-transparent border-b-2 text-white placeholder-white focus:outline-none px-4 py-2 w-full md:w-80 lg:w-96 transition-all duration-300 ease-in-out ${
                error
                  ? "border-red-500"
                  : "border-white hover:border-yellow-200 focus:border-yellow-200"
              }`}
            />
            <button
              className="text-white ml-4 hover:text-gray-100 transition-all duration-300 ease-in-out"
              onClick={handleSubmit}
            >
              <FiSend className="text-2xl" />
            </button>

            {/* Hiển thị tooltip lỗi */}
            {error && (
              <div className="absolute text-sm text-white bg-orange-500 p-2 rounded mt-2 left-0 bottom-[-30px] w-full text-center">
                <span className="inline-block mr-2">
                  <FiMail className="text-white text-lg" />
                </span>
                {error}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
