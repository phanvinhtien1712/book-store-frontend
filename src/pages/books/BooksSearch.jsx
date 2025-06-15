import React from "react";
import { useLocation } from "react-router-dom";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import BookCard from "./BookCard2";

const BooksSearch = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const search = params.get("search")?.toLowerCase() || "";

    const { data, isLoading, isError } = useFetchAllBooksQuery();
    const books = data?.books || [];

    // Lọc sách theo tên
    const filteredBooks = books.filter(book =>
        book.title?.toLowerCase().includes(search)
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Kết quả tìm kiếm: <span className="text-primary">{search}</span>
            </h1>
            {isLoading && <div>Đang tải...</div>}
            {isError && <div>Lỗi khi tải dữ liệu.</div>}
            {!isLoading && filteredBooks.length === 0 && (
                <div className="text-gray-500">Không tìm thấy sách phù hợp.</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BooksSearch;