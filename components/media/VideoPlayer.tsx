"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

type VideoPlayerProps = {
  src?: string | null;
  poster?: string | null;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  onEnded?: () => void;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  poster,
  title = "Video",
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressId = useId();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [trackedSrc, setTrackedSrc] = useState(src);
  const [trackedMuted, setTrackedMuted] = useState(muted);

  // Reset playback state when the source changes (render-time sync — no effect setState)
  if (src !== trackedSrc) {
    setTrackedSrc(src);
    setHasError(false);
    setIsLoading(Boolean(src));
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(muted);
    setTrackedMuted(muted);
  }

  if (muted !== trackedMuted) {
    setTrackedMuted(muted);
    setIsMuted(muted);
  }

  const hasSource = Boolean(src);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !hasSource || hasError) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setHasError(true);
      }
    } else {
      video.pause();
    }
  }, [hasError, hasSource]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else {
        const legacy = video as HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
        };
        legacy.webkitEnterFullscreen?.();
      }
    } catch {
      // Fullscreen can be blocked by the browser; fail silently.
    }
  }, []);

  const onSeek = (value: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const next = (value / 100) * duration;
    video.currentTime = next;
    setCurrentTime(next);
    setProgress(value);
  };

  // Keep the DOM muted attribute in sync without React setState
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " || event.key === "k") {
      event.preventDefault();
      void togglePlay();
    }
    if (event.key === "m") {
      event.preventDefault();
      toggleMute();
    }
    if (event.key === "f") {
      event.preventDefault();
      void toggleFullscreen();
    }
  };

  const hideControlsIfHoverDevice = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      isPlaying
    ) {
      setShowControls(false);
    }
  };

  if (!hasSource) {
    return (
      <div
        className={cn(
          "relative flex aspect-video items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated",
          className,
        )}
        role="status"
      >
        <p className="text-label text-text-muted">No video source yet</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated aspect-video",
        className,
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={hideControlsIfHoverDevice}
      onFocus={() => setShowControls(true)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label={title}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src ?? undefined}
        poster={poster ?? undefined}
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          setCurrentTime(video.currentTime);
          setProgress(
            video.duration ? (video.currentTime / video.duration) * 100 : 0,
          );
        }}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />

      {isLoading && !hasError ? (
        <div className="absolute inset-0 grid place-items-center bg-bg/40">
          <span className="text-label text-text-secondary">Loading</span>
        </div>
      ) : null}

      {hasError ? (
        <div className="absolute inset-0 grid place-items-center bg-bg/70 px-6 text-center">
          <div>
            <p className="text-label text-error">Unable to load video</p>
            <p className="mt-2 text-body-sm text-text-secondary">
              Check the file path or try again later.
            </p>
          </div>
        </div>
      ) : null}

      {!isPlaying && !isLoading && !hasError ? (
        <button
          type="button"
          className="absolute inset-0 grid place-items-center bg-bg/25 transition-colors hover:bg-bg/35"
          onClick={() => void togglePlay()}
          aria-label={`Play ${title}`}
        >
          <span className="play-button">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M5 3.5v11l10-5.5L5 3.5Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      ) : null}

      {controls && !hasError ? (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 via-bg/55 to-transparent px-3 pb-3 pt-10 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)]",
            showControls || !isPlaying ? "opacity-100" : "opacity-0",
          )}
        >
          <label className="sr-only" htmlFor={progressId}>
            Seek
          </label>
          <input
            id={progressId}
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={(event) => onSeek(Number(event.target.value))}
            className="mb-3 h-1 w-full cursor-pointer appearance-none rounded-pill bg-border accent-[var(--accent)]"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ControlButton
                label={isPlaying ? "Pause" : "Play"}
                onClick={() => void togglePlay()}
              >
                {isPlaying ? "Pause" : "Play"}
              </ControlButton>
              <ControlButton
                label={isMuted ? "Unmute" : "Mute"}
                onClick={toggleMute}
              >
                {isMuted ? "Unmute" : "Mute"}
              </ControlButton>
            </div>

            <p className="text-label tabular-nums text-text-muted">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>

            <ControlButton label="Fullscreen" onClick={() => void toggleFullscreen()}>
              Full
            </ControlButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded-sm px-2 py-1 text-label text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
    >
      {children}
    </button>
  );
}
