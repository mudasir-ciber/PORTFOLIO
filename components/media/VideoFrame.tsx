import { cn } from "@/lib/utils";
import { PlayButton } from "@/components/media/PlayButton";
import type { ReactNode } from "react";

type VideoFrameProps = {
  poster?: ReactNode;
  className?: string;
  label?: string;
  onPlay?: () => void;
  showPlayButton?: boolean;
};

/**
 * Visual foundation for video presentation.
 * Full showreel / player behavior comes in later phases.
 */
export function VideoFrame({
  poster,
  className,
  label = "Play video",
  onPlay,
  showPlayButton = true,
}: VideoFrameProps) {
  return (
    <div className={cn("video-shell", className)}>
      {poster ? (
        <div className="video-shell__poster" aria-hidden>
          {poster}
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-bg-elevated"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--bg-elevated), var(--surface))",
          }}
        />
      )}
      <div className="video-shell__overlay">
        {showPlayButton ? (
          <PlayButton label={label} onClick={onPlay} />
        ) : null}
      </div>
    </div>
  );
}
