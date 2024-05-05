import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";

function Navbar() {
  return (
    <>
      <div className="bg-[#41B06E] min-h-16 w-full fixed top-0 flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold text-[#141E46]">UserVault</h1>
        </div>
        <div>
          <RiAccountCircleLine
            size={20}
            className="cursor-pointer hover:text-[#8DECB4]  transition-all ease-in-out text-[#141E46]"
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
