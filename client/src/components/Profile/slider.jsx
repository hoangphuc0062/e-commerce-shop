import { useRef, useState, useEffect } from 'react';

const BannerSlider = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  const banners = [
    {
      src: "https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/xiaomi-pad-6s-pro-wifi.jpg",
      alt: "Lên đời 4G - Giảm sâu hết cỡ",
      text: "Lên đời 4G - Giảm sâu hết cỡ"
    },
    {
      src: "https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/laptop-ai-banner-chung-slide.png",
      alt: "Galaxy Tab S10 Series - Ưu đãi tốt",
      text: "Galaxy Tab S10 Series - Ưu đãi tốt"
    },
    {
      src: "https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/b2s-2024-cate-banner-trang-khuyen-mai-KV-690x300.jpg",
      alt: "Xiaomi Pad 6S Pro",
      text: "Xiaomi Pad 6S Pro"
    }
  ];

  // Nhân đôi danh sách banners để tạo cảm giác vòng lặp
  const extendedBanners = [...banners, ...banners];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsClickDisabled(true);
    setTimeout(() => setIsClickDisabled(false), 100);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    const scrollWidth = slider.scrollWidth / 2; // Tổng chiều dài của một nửa slider (do đã nhân đôi mảng)

    // Cuộn mượt mà vô hạn
    if (slider.scrollLeft >= scrollWidth) {
      slider.scrollLeft = slider.scrollLeft - scrollWidth;
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft = slider.scrollLeft + scrollWidth; // Đưa về cuối để tiếp tục vòng lặp
    }
  };

  const handleClick = (e) => {
    if (isClickDisabled) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Tự động cuộn slider
  useEffect(() => {
    const slider = sliderRef.current;
    let autoScroll;

    const startAutoScroll = () => {
      autoScroll = setInterval(() => {
        slider.scrollLeft += 2; // Tăng giá trị để cuộn tự động (2px mỗi lần)
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0; // Khi đến giữa, đưa về đầu để cuộn vô hạn
        }
      }, 16); // Tốc độ cuộn mượt mà
    };

    const stopAutoScroll = () => {
      clearInterval(autoScroll);
    };

    if (slider) {
      startAutoScroll();
      slider.addEventListener('mouseenter', stopAutoScroll);
      slider.addEventListener('mouseleave', startAutoScroll);
    }

    return () => {
      if (slider) {
        stopAutoScroll();
        slider.removeEventListener('mouseenter', stopAutoScroll);
        slider.removeEventListener('mouseleave', startAutoScroll);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-2 max-w-screen-lg overflow-hidden">
      <div className="relative">
        <div
          className="flex overflow-x-hidden whitespace-nowrap space-x-4 scrollbar-hide"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {extendedBanners.map((banner, index) => (
            <div className="flex-none w-64" key={index}>
              <a href="">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-center text-sm mt-2">{banner.text}</p>
              </a>
            </div>
          ))}
        </div>
        <div className="absolute left-0 right-0 flex justify-center space-x-2 p-2">
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
