import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const NAVIGATION = [
  { name: "Trang cá nhân", href: "/user-dashboard" },
  { name: "Đơn hàng", href: "/orders" },
  { name: "Giỏ hàng", href: "/cart" },
  { name: "Thanh toán", href: "/checkout" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo & Tìm kiếm */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center text-gray-800 font-bold text-xl">
              <HiMiniBars3CenterLeft className="w-6 h-6" />
            </Link>

            <form onSubmit={handleSearch} className="relative w-40 sm:w-64 md:w-72">
              <IoSearchOutline
                className="absolute left-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Tìm kiếm sách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 rounded-md bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
          </div>

          {/* User, Favorite, Cart */}
          <div className="flex items-center gap-3 relative">
            {/* Avatar / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="focus:outline-none"
                >
                  <img
                    src={avatarImg}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500 object-cover"
                  />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      {NAVIGATION.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : token ? (
              <Link to="/dashboard" title="Trang quản trị">
                <img src={avatarImg} alt="admin" className="w-8 h-8 rounded-full" />
              </Link>
            ) : (
              <Link to="/login" title="Đăng nhập">
                <HiOutlineUser className="w-6 h-6 text-gray-700" />
              </Link>
            )}

            {/* Yêu thích */}
            <Link to="/favorites" className="hidden sm:block text-gray-700" title="Yêu thích">
              <HiOutlineHeart className="w-6 h-6" />
            </Link>

            {/* Giỏ hàng */}
            <Link
              to="/cart"
              className="flex items-center text-gray-800 relative"
              title="Giỏ hàng"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              <span className="ml-1 text-sm font-semibold">{cartItems.length}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
