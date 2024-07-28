import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./service/userService";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUsPage";
import ServicesByCategoryPage from "./pages/ServicesByCategoryPage";
import TaskOwnerDetailsPage from "./pages/TaskOwnerDetailsPage";
import { GetAllNotifications } from "./service/notificationService";
import RecoverPage from "./pages/RecoverPage";
import FAQs from "./pages/FAQPage";

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        await GetAllNotifications(user._id)
          .then(({ data }) => {
            setNotificationCount(data.length);
          })
          .catch((err) => {
            console.log(err);
          });
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
        reverseOrder={false}
      />
      {location.pathname !== "/skb-admin" && location.pathname !== "/admin" && (
        <Header
          user={user}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setUser={setUser}
              setNotificationCount={setNotificationCount}
            />
          }
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover-password" element={<RecoverPage />} />
        <Route
          path="/profile"
          element={<ProfilePage user={user} setUser={setUser} />}
        />
        <Route path="/task/:id" element={<TaskDetailsPage user={user} />} />
        <Route
          path="/task-owner/:id"
          element={<TaskOwnerDetailsPage user={user} />}
        />

        <Route path="/skb-admin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage user={user} />} />

        <Route
          path="/professional-services"
          element={<ServicesByCategoryPage />}
        />
        <Route path="/domestic-services" element={<ServicesByCategoryPage />} />
        <Route
          path="/hospitality-and-lifestyle-services"
          element={<ServicesByCategoryPage />}
        />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq" element={<FAQs />} />
      </Routes>
      {location.pathname !== "/skb-admin" && location.pathname !== "/admin" && (
        <Footer />
      )}
    </>
  );
}
