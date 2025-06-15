import React from 'react'

import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>Sách Mới Phát Hành Tuần Này</h1>
            <p className='mb-10'>Đã đến lúc cập nhật danh sách đọc của bạn với những cuốn sách mới nhất và hay nhất trên thị trường. Từ những tiểu thuyết ly kỳ đến hồi ký hấp dẫn, các đầu sách mới ra mắt tuần này sẽ mang đến lựa chọn cho mọi độc giả.</p>

            <button className='btn-primary'>Đăng Ký Nhận Sách </button>
        </div>

       
    </div>
  )
}

export default Banner