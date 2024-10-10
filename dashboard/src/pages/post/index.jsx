import React, { useState } from 'react';
// import ReusableTable from '../../components/Table';
import EyePost from './details';
// import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReusableTablePost from './table';

const columns = [
    // { label: "ID", field: "id" },
    { label: "Tác giả", field: "name" },
    { label: "", field: "thumbnail" },
    { label: "Tiêu đề bài viết", field: "post_title" },
    { label: "Mô tả ngắn", field: "postShortDescription" },
    // { label: "Từ khóa SEO", field: "seoKeywords" },
    { label: "Ngày đăng ", field: "" },
    { label: "Trạng thái", field: "statustPost" },
    { label: "Đánh giá", field: "rating" },

];

const initialData = [
    {
        id: 1010,
        name: "Haku",
        post_title: "Cách tối ưu hóa SEO cho bài viết",
        slug: "toi-uu-hoa-seo-bai-viet",
        thumbnail: "https://via.placeholder.com/50",
        postShortDescription: "Hướng dẫn chi tiết cách tối ưu hóa SEO cho bài viết.",
        seoKeywords: "SEO, tối ưu hóa",
        metaDescription: "Bài viết này giúp bạn hiểu rõ hơn về SEO.",
        shortSeoDescription: "SEO là yếu tố quan trọng",
        articleContent: "Nội dung chi tiết về cách tối ưu hóa SEO. Đầu tiên, bạn cần hiểu rõ về từ khóa mà người dùng thường tìm kiếm. Từ đó, bạn có thể tối ưu hóa tiêu đề, mô tả và nội dung chính của bài viết. Thêm vào đó, bạn cũng nên sử dụng các liên kết nội bộ và liên kết ngoài để tăng độ tin cậy của bài viết. Cuối cùng, việc cập nhật nội dung định kỳ cũng giúp cải thiện thứ hạng SEO của bạn trên các công cụ tìm kiếm.",
        staff: [1, 2],
        category: [1, 3],
        statustPost: "draft",
        rating: [5],
    },
    {
        id: 1112,
        name: "Melax",
        post_title: "Hướng dẫn viết bài chuyên nghiệp",
        slug: "huong-dan-viet-bai-chuyen-nghiep",
        thumbnail: "https://via.placeholder.com/50",
        postShortDescription: "Cách viết bài hấp dẫn và chuẩn SEO.",
        seoKeywords: "viết bài, chuyên nghiệp",
        metaDescription: "Bài viết này hướng dẫn cách viết bài hấp dẫn và thu hút.",
        shortSeoDescription: "Viết bài chuyên nghiệp và chuẩn SEO.",
        articleContent: "Nội dung chi tiết về cách viết bài chuyên nghiệp. Để viết một bài viết chất lượng, bạn cần bắt đầu từ việc lên ý tưởng và tìm hiểu về đối tượng độc giả của mình. Một bài viết hay không chỉ cần có nội dung phong phú mà còn phải dễ hiểu và thú vị. Hãy chắc chắn rằng bạn tổ chức nội dung một cách hợp lý, sử dụng tiêu đề phụ để chia nhỏ các phần, và luôn kiểm tra lại ngữ pháp và chính tả trước khi công bố bài viết.",
        staff: [3, 4],
        category: [2, 4],
        statustPost: "published",
        rating: [4]
    },
];
export default function PostList() {
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const navigate = useNavigate(); // Initialize navigate here inside the component

    const handleEdit = (id) => {
        navigate(`/dashboard/post/edit/${id}`); // Navigate to EditPost with post ID
    };
    const handleDelete = (id) => {
        console.log("Delete", id);
    };

    const handleEye = (index) => {
        setSelectedData(index); // Get the selected post data
        setOpen(true); // Open the dialog
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ReusableTablePost
                data={initialData}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleEye={handleEye}
                navigate={"/dashboard/post/create"}
            />
            {selectedData && (
                <EyePost
                    open={open}
                    handleClose={handleClose}
                    selectedData={selectedData}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
        </>
    );
}
