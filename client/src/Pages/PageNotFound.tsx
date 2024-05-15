import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="uppercase tracking-wider font-bold mb-8 text-6xl">
          404
        </h1>
        <h1 className="uppercase tracking-wider font-semibold text-3xl">
          Page not found
        </h1>
        <p className="my-4">sorry, the page you're looking for is not exist.</p>
        <button
          className="bg-purple-700 p-4 rounded-xl font-medium text-sm text-white hover:bg-purple-800"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </>
  );
};
