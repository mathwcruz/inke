import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Event } from "./pages/Event";
import { Subscribe } from "./pages/Subscribe";

export const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userIsRegistered = Cookies.get("@inke:userData") || "";

    if (!userIsRegistered) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="/event" element={<Event />} />
      <Route path="/event/lesson/:slug" element={<Event />} />
    </Routes>
  );
};
