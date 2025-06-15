import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommened = () => {
    const { data, isLoading, isError } = useFetchAllBooksQuery();
    const books = data?.books || []; 

    if (isLoading) return <div>Đang tải...</div>;
    if (isError) return <div>Lỗi khi tải dữ liệu sách.</div>;

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommended mấy cuốn sách hay cho bạn.</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    books.length > 0 ? books.slice(10, 20).map((book, index) => (
                        <SwiperSlide key={book._id || index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    )) : (
                        <SwiperSlide>
                            <div className="text-gray-500 p-8">Không có sách nào phù hợp.</div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default Recommened