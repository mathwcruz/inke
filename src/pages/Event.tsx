import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

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
  const { slug } = useParams<{ slug: string }>();
  const { data, loading } = useQuery<GetLessonsSlugResponse>(
    GET_LESSONS_SLUG_QUERY
  );

  useEffect(() => {
    if (loading || !!slug) {
      return;
    }

    const lessonsSlugs = data?.lessons?.map((lesson) => lesson?.slug);
    window.location.href = `/event/lesson/${lessonsSlugs?.shift()}`;
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
