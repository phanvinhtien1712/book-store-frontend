/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
  colors: {
    primary: '#FFCE1A',       
    secondary: '#0D0842',     // Xanh tím đậm: header/footer
    blackBG: '#F3F3F3',       
    favorite: '#FF5841',      // Nút yêu thích hoặc cảnh báo
    textDark: '#1F2937',      // Màu chữ chính – nên thêm để dễ đọc
    accent: '#3B82F6',        // Link / hover hiệu ứng nhẹ
    success: '#10B981',       // Thông báo thành công, mua hàng
  },
  fontFamily: {
    primary: ['Montserrat', 'sans-serif'],
    secondary: ['"Nunito Sans"', 'sans-serif'],
  },
}

  },
  plugins: [
    require('flowbite/plugin')
  ],
}