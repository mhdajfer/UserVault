import { useSelector } from "react-redux";
import { userState } from "../../Types/Types";
import Navbar from "../../Components/Navbar";

function AdminDashboard() {
  const user = useSelector((state: userState) => state);
  console.log(user);
  return (
    <>
      <Navbar />
      <h1>Dashboard</h1>
    </>
  );
}

export default AdminDashboard;
