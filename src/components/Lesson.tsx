import { useCallback, useMemo } from "react";
import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import { enUS } from "date-fns/locale";

export type LessonData = {
  id: string;
  title: string;
  slug: string;
  lessonType: "class" | "live";
  availableAt: string;
};

interface LessonProps {
  lesson: LessonData;
}

const LESSON_TYPES = {
  live: "LIVE",
  class: "PRACTICAL CLASS",
};
Object.freeze(LESSON_TYPES);

export const Lesson = ({ lesson }: LessonProps) => {
  const isLessonAvailable = useMemo(
    () => isPast(new Date(lesson?.availableAt)),
    [lesson?.availableAt]
  );

  const isSelected = false;

  const handleWatchLesson = useCallback((lessonSlug: string) => {
    console.log({ lessonSlug });
  }, []);

  return (
    <li className="list-none">
      <span className="text-neutral-500">
        {format(
          new Date(lesson?.availableAt),
          "EEEE' • 'MMMM do' • 'k':'mm bbb",
          { locale: enUS }
        )}
      </span>
      <button
        aria-disabled={!isLessonAvailable}
        disabled={!isLessonAvailable}
        className={`${
          !isLessonAvailable
            ? "opacity-50 cursor-not-allowed hover:border-neutral-600"
            : isLessonAvailable && isSelected
            ? "bg-rose-500 hover:border-neutral-600 cursor-default"
            : "hover:border-rose-600"
        } rounded border border-neutral-600 p-4 mt-2 block transition-colors duration-200 w-full`}
        title={
          !isLessonAvailable
            ? `This ${LESSON_TYPES?.[
                lesson?.lessonType
              ]?.toLowerCase()} will be available soon`
            : ""
        }
        onClick={() => handleWatchLesson(lesson?.slug)}
      >
        <header className="flex items-center justify-between gap-2">
          {isLessonAvailable ? (
            <span
              className={`text-sm font-medium flex items-center gap-1 ${
                isSelected ? "text-white" : "text-sky-400"
              }`}
            >
              <CheckCircle weight="bold" size={20} />
              Released content
            </span>
          ) : (
            <span className="text-sm text-orange-400 font-medium flex items-center gap-1">
              <Lock weight="bold" size={20} />
              Soon
            </span>
          )}
          <span
            className={`text-xs rounded px-2 py-[2px] text-white border border-rose-500 font-bold ${
              isSelected ? "border-white" : "border-rose-500"
            }`}
          >
            {LESSON_TYPES?.[lesson?.lessonType]}
          </span>
        </header>
        <strong className="text-neutral-400 mt-5 block text-left">
          {lesson?.title}
        </strong>
      </button>
    </li>
  );
};
