import React from 'react'
import footerLogo  from "../assets/footer-logo.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Phần trên cùng */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Bên trái - Logo và điều hướng */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="#home" className="hover:text-primary">Trang chủ</a></li>
            <li><a href="#services" className="hover:text-primary">Dịch vụ</a></li>
            <li><a href="#about" className="hover:text-primary">Về chúng tôi</a></li>
            <li><a href="#contact" className="hover:text-primary">Liên hệ</a></li>
          </ul>
        </div>

        {/* Bên phải - Đăng ký nhận tin */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Đăng ký nhận bản tin để nhận thông tin cập nhật, tin tức và ưu đãi mới nhất!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* Phần dưới cùng */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Bên trái - Liên kết chính sách */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Chính sách bảo mật</a></li>
          <li><a href="#terms" className="hover:text-primary">Điều khoản dịch vụ</a></li>
        </ul>

        {/* Bên phải - Mạng xã hội */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer