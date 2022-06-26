import { useGetLessonsQuery } from "../graphql/generated";

import { Lesson } from "./Lesson";
import { Loading } from "./Loading";

export const Sidebar = () => {
  const { data, loading } = useGetLessonsQuery();

  return (
    <aside className="w-[348px] p-6 border-l border-neutral-600 hidden lg:block">
      <h4 className="font-bold text-2xl pb-6 mb-6 border-b border-b-neutral-500 block">
        Classes schedule
      </h4>

      <section className="flex flex-col gap-8">
        {loading ? (
          <Loading iconSize={42} />
        ) : data?.lessons?.length ? (
          <>
            {data?.lessons?.map((lesson) => (
              <Lesson
                key={lesson?.id}
                id={lesson?.id}
                slug={lesson?.slug}
                title={lesson?.title}
                availableAt={lesson?.availableAt}
                lessonType={lesson?.lessonType}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </section>
    </aside>
  );
};
