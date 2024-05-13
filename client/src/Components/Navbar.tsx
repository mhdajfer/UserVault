import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { clearStore } from "../Redux/user";
import { userState } from "../Types/Types";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: { user: userState }) => state.user.admin);
  return (
    <>
      <div className="bg-[#41B06E] min-h-16 w-full sticky top-0 flex  items-center justify-between px-8">
        <div>
          <h1
            className="text-2xl font-bold text-[#141E46] cursor-pointer"
            onClick={() => navigate(isAdmin ? "/admin/home" : "/home")}
          >
            UserVault
          </h1>
        </div>
        <div>
          <RiAccountCircleLine
            size={20}
            className="cursor-pointer hover:text-[#8DECB4]  transition-all ease-in-out text-[#141E46]"
            onClick={() => navigate(isAdmin ? "/admin/profile" : "/profile")}
          />
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            Cookies.remove("token");
            dispatch(clearStore());
            navigate("/login");
          }}
          type="button"
          className="py-1 px-4 me-2 text-sm font-mono text-gray-900 focus:outline-none bg-[#FFF5E0] rounded-lg border border-gray-200  hover:bg-opacity-90 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Navbar;
