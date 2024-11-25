import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { IoMdLogOut } from "react-icons/io";
import { FcLike } from "react-icons/fc";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset the modal when the user logs in or logs out
  useEffect(() => {
    setIsModalOpen(false);  // Ensure modal is closed after login or user state change
  }, [user]);  // Re-run the effect when 'user' changes (e.g., login/logout)

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login'); // Redirect to login page after logout
  };

  // Open and close modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-[#526E48] text-white p-4">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="text-xl font-bold">
            Movies Mania
          </Link>
        </div>

        {/* Right Section */}
        <div>
          {user ? (
            <div className="flex items-center">
              {/* Favorites Icon */}
              <Link to="/favorites" className="mx-2">
                <FcLike size={"30px"} />
              </Link>

              {/* Logout Button */}
              <div>
                {/* Button to open the modal */}
                <button
                  onClick={openModal}
                  className=" border-s ms-2 text-white px-4 py-2  flex items-center"
                >
                  <IoMdLogOut size={'25px'} />
                </button>

                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                      <h2 className="text-lg text-red-500 font-semibold mb-4">
                        Are you sure you want to logout?
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Logout
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-gray-300 text-black px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Login/Register Links */}
              <Link to="/login" className="mx-2">
                Login
              </Link>
              <Link to="/register" className="mx-2">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
