import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Video } from "../components/Video";

export const Event = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-row flex-1">
        <Video />
        <Sidebar />
      </main>
    </div>
  );
};
