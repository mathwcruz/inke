import { DefaultUi, Player, Youtube } from "@vime/react";
import { FileArrowDown, Image, Lightning } from "phosphor-react";

import { useGetLessonBySlugQuery } from "../graphql/generated";

import { LessonLinkCard } from "./LessonLinkCard";
import { Loading } from "./Loading";

import "@vime/core/themes/default.css";

interface VideoProps {
  lessonSlug: string;
}

export const Video = ({ lessonSlug }: VideoProps) => {
  const { data, loading } = useGetLessonBySlugQuery({
    variables: { slug: lessonSlug },
  });

  return (
    <div className="flex-1">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loading iconSize={50} />
        </div>
      ) : (
        <>
          <div className="bg-black flex justify-center">
            <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
              <Player>
                <Youtube videoId={data?.lesson?.videoId || ""} />
                <DefaultUi />
              </Player>
            </div>
          </div>
          <div className="p-8 max-w-[1100px] mx-auto">
            <div className="flex items-start gap-16">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{data?.lesson?.title}</h1>
                <p className="mt-4 text-neutral-400 leading-relaxed">
                  {data?.lesson?.description}
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={data?.lesson?.teacher?.avatarURL}
                    alt={`${data?.lesson?.teacher?.name} picture`}
                    className="h-16 w-16 rounded-full border-2 border-rose-700"
                  />

                  <div className="leading-relaxed">
                    <strong className="font-bold text-2xl block">
                      {data?.lesson?.teacher?.name}
                    </strong>
                    <span className="text-neutral-500 text-sm block">
                      {data?.lesson?.teacher?.bio}
                    </span>
                  </div>
                </div>
              </div>
              {data?.lesson?.challenge?.url && (
                <a
                  href={data?.lesson?.challenge?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 text-neutral-900 hover:opacity-75 text-sm bg-sky-400 flex items-center rounded font-bold uppercase gap-2 justify-center transition-colors duration-200"
                >
                  <Lightning size={24} />
                  Access the challenge
                </a>
              )}
            </div>
            {(data?.lesson?.complementaryMaterial ||
              data?.lesson?.exclusiveWallpapers) && (
              <div className="gap-8  mt-20 grid grid-cols-2">
                {data?.lesson?.complementaryMaterial && (
                  <LessonLinkCard
                    title="Complementary material"
                    description="Access the complementary material to improve your development"
                    icon={<FileArrowDown size={40} />}
                    href={data?.lesson?.complementaryMaterial}
                  />
                )}
                {data?.lesson?.exclusiveWallpapers && (
                  <LessonLinkCard
                    title="Exclusive wallpapers"
                    description="Download exclusive wallpapers and customize your machine"
                    icon={<Image size={40} />}
                    href={data?.lesson?.exclusiveWallpapers}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
