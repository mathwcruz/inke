import { ReactElement } from "react";
import { CaretRight } from "phosphor-react";

interface LessonLinkCardProps {
  title: string;
  description: string;
  icon: ReactElement;
  href: string;
}

export const LessonLinkCard = ({
  title,
  description,
  icon,
  href,
}: LessonLinkCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-neutral-900 rounded overflow-hidden flex items-stretch gap-6 hover:bg-neutral-800 transition-colors"
    >
      <div className="bg-rose-700 h-full p-6 flex items-center">{icon}</div>
      <div className="py-6 leading-relaxed">
        <strong className="text-2xl">{title}</strong>
        <p className="text-sm text-neutral-300 mt-2">{description}</p>
      </div>
      <div className="h-full p-6 flex items-center">
        <CaretRight size={24} />
      </div>
    </a>
  );
};
