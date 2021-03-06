import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetLessonsSlugsQuery } from "../graphql/generated";

import { useMenu } from "../contexts/MenuContext";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Loading } from "../components/Loading";

export const Event = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const { data, loading } = useGetLessonsSlugsQuery();

  const { isMenuOpen } = useMenu();

  useEffect(() => {
    if (loading || !!slug) {
      return;
    }

    const lessonsSlugs = data?.lessons?.map((lesson) => lesson?.slug);
    navigate(`/event/lesson/${lessonsSlugs?.shift()}`);
  }, [data?.lessons]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {!isMenuOpen ? (
        <main className="flex flex-row flex-1">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loading iconSize={50} />
            </div>
          ) : (
            <Video lessonSlug={slug || ""} />
          )}
          <Sidebar className="hidden lg:block" />
        </main>
      ) : (
        <div>
          <Sidebar />
        </div>
      )}
    </div>
  );
};
