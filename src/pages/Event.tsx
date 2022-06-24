import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Cookies from "js-cookie";

import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Loading } from "../components/Loading";

const GET_LESSONS_SLUG_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      slug
    }
  }
`;

interface GetLessonsSlugResponse {
  lessons: {
    slug: string;
  }[];
}

export const Event = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { data, loading } = useQuery<GetLessonsSlugResponse>(
    GET_LESSONS_SLUG_QUERY
  );

  useEffect(() => {
    const userIsRegistered = Cookies.get("@inke:userData") || "";

    if (!userIsRegistered) {
      navigate("/");
    }
  }, []);

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
      <main className="flex flex-row flex-1">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading iconSize={50} />
          </div>
        ) : (
          <Video lessonSlug={slug || ""} />
        )}
        <Sidebar />
      </main>
    </div>
  );
};
