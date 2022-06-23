import { gql, useQuery } from "@apollo/client";
import { DefaultUi, Player, Youtube } from "@vime/react";
import { DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";

import { LessonLinkCard } from "./LessonLinkCard";

import "@vime/core/themes/default.css";
import { Loading } from "./Loading";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      description
      videoId
      complementaryMaterial
      exclusiveWallpapers

      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    complementaryMaterial: string;
    exclusiveWallpapers: string;
    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    };
  };
}

interface VideoProps {
  lessonSlug: string;
}

export const Video = ({ lessonSlug }: VideoProps) => {
  const { data, loading } = useQuery<GetLessonBySlugResponse>(
    GET_LESSON_BY_SLUG_QUERY,
    {
      variables: { slug: lessonSlug },
    }
  );

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
              <ul className="flex flex-col gap-4">
                <a
                  href=""
                  className="p-4 text-sm bg-rose-600 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-rose-700 transition-colors duration-200"
                >
                  <DiscordLogo size={24} />
                  Discord Community
                </a>
                <a
                  href=""
                  className="p-4 text-sm border border-sky-400 text-sky-400 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-sky-400 hover:text-neutral-900 transition-colors duration-200"
                >
                  <Lightning size={24} />
                  Access the challenge
                </a>
              </ul>
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
