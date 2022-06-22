import { gql, useQuery } from "@apollo/client";
import { SpinnerGap } from "phosphor-react";

import { Lesson, LessonData } from "./Lesson";

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      slug
      title
      lessonType
      availableAt
    }
  }
`;

export const Sidebar = () => {
  const { data, loading } = useQuery(GET_LESSONS_QUERY);

  return (
    <aside className="w-[348px] p-6 border-l border-neutral-600">
      <h4 className="font-bold text-2xl pb-6 mb-6 border-b border-b-neutral-500 block">
        Classes schedule
      </h4>

      <section className="flex flex-col gap-8">
        {loading ? (
          <SpinnerGap
            size={45}
            className="animate-spin self-center mt-6 text-rose-700"
          />
        ) : data?.lessons?.length > 0 ? (
          <>
            {data?.lessons?.map((lesson: LessonData) => (
              <Lesson key={lesson?.id} lesson={lesson} />
            ))}
          </>
        ) : (
          <></>
        )}
      </section>
    </aside>
  );
};
