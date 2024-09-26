import Heading from "../Heading/Heading";
import { useState } from 'react';

const QnASection = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: "Pham Vinh Quang",
      question: "Bên mình trả góp như thế nào a?",
      adminResponse: "Voi Tay Nguyen xin chào Anh <br /> Dạ. Bên em có hỗ trợ trả góp qua công ty tài chính, thẻ tín dụng và Kredivo, Fundiin, Home Paylater ạ. Không biết anh đang quan tâm cụ thể dòng sản phẩm nào để em tiện kiểm tra giúp mình ạ. <br /> Xin thông tin đến Anh.",
      date: "2022-01-01"
    }
  ]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-4 md:p-6">
      {/* Heading Section */}
      <div className="pb-2">
        <Heading title="Hỏi và đáp" />
      </div>

      {/* Question Form */}
      <form className="flex flex-col md:flex-row items-start md:items-end w-full">
        <textarea
          className="flex-1 border border-gray-300 rounded-lg p-2 md:mr-2 h-[150px] w-full"
          placeholder="Xin mời để lại câu hỏi, Voi Tay Nguyen sẽ trả lời trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào ngày làm việc sau..."
          name="question"
          onChange={(e) => addQuestion({ user: "User", question: e.target.value, adminResponse: "", date: new Date().toISOString().split('T')[0] })}
        />
        <button
          type="submit"
          className="bg-main text-white rounded-lg px-4 py-2 mt-4 md:mt-0 h-[40px]"
        >
          Gửi
        </button>
      </form>

      {/* User Question Section */}
      {questions.map((question) => (
        <div key={question.id} className="border-b border-gray-300 py-4 flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s"
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-gray-600">{question.user}:</p>
            <p className="text-sm border rounded-lg shadow-sm p-2">
              {question.question}
            </p>
            <p className="text-xs text-gray-400 pt-2">{question.date}</p>
          </div>
        </div>
      ))}

      {questions.map((question) => (
        question.adminResponse && (
          <div key={question.id} className="flex items-start py-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold text-main">Quản Trị Viên:</p>
              <p className="text-sm border rounded-lg shadow-sm p-2">
                {question.adminResponse}
              </p>
              <p className="text-xs text-gray-400 pt-2">{question.date}</p>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default QnASection;
