import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function GuestLayout() {
  const { token } = useUser();

  if(token) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
