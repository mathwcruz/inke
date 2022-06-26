import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { isPast, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CheckCircle, Lock } from "phosphor-react";

interface LessonProps {
  id: string;
  title: string;
  slug: string;
  lessonType: "class" | "live";
  availableAt: string;
}

const LESSON_TYPES = {
  live: "LIVE",
  class: "PRACTICAL CLASS",
};
Object.freeze(LESSON_TYPES);

export const Lesson = ({
  id,
  slug,
  title,
  availableAt,
  lessonType,
}: LessonProps) => {
  const { slug: _slug } = useParams<{ slug: string }>();

  const isLessonAvailable = useMemo(
    () => isPast(new Date(availableAt)),
    [availableAt]
  );

  const isSelected = useMemo(() => _slug === slug, [_slug, slug]);

  return (
    <li className="list-none">
      <span className="text-neutral-500">
        {format(new Date(availableAt), "EEEE' • 'MMMM do' • 'k':'mm bbb", {
          locale: enUS,
        })}
      </span>
      <a
        aria-disabled={!isLessonAvailable}
        href={`/event/lesson/${slug}`}
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
                lessonType
              ]?.toLowerCase()} will be available soon`
            : ""
        }
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
            {LESSON_TYPES?.[lessonType]}
          </span>
        </header>
        <strong className="text-neutral-400 mt-5 block text-left">
          {title}
        </strong>
      </a>
    </li>
  );
};
