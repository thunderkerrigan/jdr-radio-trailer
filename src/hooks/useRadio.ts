import { useEffect, useState, useCallback, useMemo } from "react";

type useAudioPlaylistHook = [
  (shouldMute: boolean) => void,
  () => void,
  boolean,
  boolean
];

const useAudioPlaylist = (playlist: string[]): useAudioPlaylistHook => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playNextTrack = useCallback(
    () => setCurrentTrackIndex((prev) => (prev + 1) % playlist.length),
    [playlist]
  );

  const player = useMemo(() => {
    const _audio = new Audio(playlist[currentTrackIndex]);
    
    _audio.autoplay = true;
    _audio.defaultMuted = true;
    _audio.muted = true;
    _audio.addEventListener("ended", playNextTrack);
    _audio.addEventListener("play", () => setIsPlaying(true));

    return _audio;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist, playNextTrack]);
  const isMuted = useMemo(() => player.muted, [player]);

  useEffect(() => {
    player.src = playlist[currentTrackIndex];
  }, [player, playlist, currentTrackIndex]);


  const setMute = (shouldMute: boolean) => (player.muted = shouldMute);

  return [setMute, () => setCurrentTrackIndex(0), isPlaying, isMuted];
};

export default useAudioPlaylist;
