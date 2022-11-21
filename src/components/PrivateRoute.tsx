import { Oval } from "react-loader-spinner";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return (
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{
          display: "grid",
          height: "80vh",
          placeContent: "center",
        }}
        wrapperClass="spinner"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
