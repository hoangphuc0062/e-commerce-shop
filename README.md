1. Trước khi bắt đầu "LUÔN LUÔN CHECK GIT XEM CÓ CODE MỚI KHÔNG. LUÔN PULL CODE MỚI TRƯỚC KHI BẮT ĐẦU CODE"
2. Để làm gì ? TRÁNH CONFIG KHÔNG ĐÁNG CÓ
3. Sau khi pull code mới về thì cần cd vào thư mục cd client hoặc server rồi =>> npm i
4. Đọc kỹ các requirement mà leader yêu cầu
5. Nếu có CONFIG KHÔNG ĐƯỢC TỰ Ý XỬ LÝ, YÊU CẦU MEET TEAM ĐỂ XỬ LÝ
6. Các node library, env, env example không được push lên git. Vì sao ? Lộ env (got hacked, nhiều thứ vãi đạn khác, ...)
7. Trước khi nhấn nút merger code hãy suy nghĩ thật kỹ
   Merger phải merger vào nhanh local xem nó đã work ổn chưa trc khi đẩy lên git
   Merger phải merger vào dev (môi trường để lập trình) còn (main) khi đã chạy dev oke r thì mới leader sẽ merger vào main, TUYỆT ĐỐI CÁC NHÁNH KHÔNG ĐƯỢC MERGE TRỰC TIẾP VÀO MAIN ĐỂ TRÁNH NHỮNG ĐIỀU ĐÁNG TIẾC.
