import { SpinnerGap } from "phosphor-react";

interface LoadingProps {
  iconSize: number;
}

export const Loading = ({ iconSize }: LoadingProps) => (
  <SpinnerGap
    size={iconSize}
    className="animate-spin self-center mt-6 text-rose-700"
  />
);
