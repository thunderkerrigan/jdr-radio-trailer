import { useEffect, useState, useMemo } from "react";

type useAudioURLHook = [
  (shouldMute: boolean) => void,
  () => void,
  boolean,
  boolean
];

const useAudioURL = (url: string): useAudioURLHook => {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useMemo(() => {
    const _audio = new Audio(url);

    _audio.autoplay = true;
    _audio.defaultMuted = true;
    _audio.muted = true;
    _audio.addEventListener("play", () => setIsPlaying(true));
    _audio.addEventListener("pause", () => setIsPlaying(false));

    return _audio;
  }, [url]);
  const isMuted = useMemo(() => player.muted, [player]);

  const setMute = (shouldMute: boolean) => (player.muted = shouldMute);

  const playRadio = async () => await player.play();

  return [setMute, playRadio, isPlaying, isMuted];
};

export default useAudioURL;
