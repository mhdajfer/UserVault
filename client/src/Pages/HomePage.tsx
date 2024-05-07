import Navbar from "../Components/Navbar";
import homeImg from "../assets/homePageImg.png";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        <div className="flex justify-center  w-2/3 items-center">
          <h1
            style={{ fontFamily: "Sofia", fontStyle: "oblique" }}
            className="text-5xl font-extrabold text-[#141E46]"
          >
            Hey,
          </h1>
          <h1 className="ms-6 text-5xl font-extrabold text-[#141E46]">
            {"   "}
            Welcome Ajfer.
          </h1>
        </div>
        <div className="w-1/3 flex items-center me-16">
          <img src={homeImg} alt="" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
