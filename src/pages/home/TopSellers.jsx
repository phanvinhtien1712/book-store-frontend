import React, { useState } from 'react'
import BookCard from '../books/BookCard'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'

// Danh sách thể loại bằng tiếng Việt
const categories = ["Tất cả thể loại", "Kinh doanh", "Tiểu thuyết", "Kinh dị", "Phiêu lưu"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Tất cả thể loại")
    const { data } = useFetchAllBooksQuery();
    const books = data?.books || [];

    // Lọc sách theo thể loại
    const filteredBooks =
        selectedCategory === "Tất cả thể loại"
            ? books
            : books.filter(
                (book) =>
                    book.category &&
                    book.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
            )

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Sách Bán Chạy</h2>
            {/* Lọc theo thể loại */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    name="category"
                    id="category"
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default TopSellers