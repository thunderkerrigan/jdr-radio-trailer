import { useEffect, useState } from "react";

import "./App.css";
import parisSong1 from "./assets/Alerte_Bombardement_Paris_1940.mp3";
import parisSong2 from "./assets/Lili_Marlene.mp3";
import parisSong3 from "./assets/Maurice_Chevalier_Fleur_De_Paris.mp3";
import parisSong4 from "./assets/Radio-Paris.mp3";

import londonSong1 from "./assets/LE_CHANT_DES_PARTISANS.mp3";
import londonSong2 from "./assets/radio_londres.mp3";
import londonSong3 from "./assets/Well_Meet_Again.mp3";
import londonSong4 from "./assets/Radio_Paris_ment_Messages_perso.mp3";

import germanSong1 from "./assets/german_radio.mp3";
import germanSong2 from "./assets/morse.mp3";

import tuningSound from "./assets/Radio_Tuning.mp3";
import switchSound from "./assets/radio_click_button.wav";

import Radio from "./Radio/Radio";
import useAudioPlaylist from "./hooks/useRadio";
import Backdrop from "./Backdrop/Backdrop";
import useAudioURL from "./hooks/useTrueRadio";

const parisPlaylist = [parisSong1, parisSong2, parisSong3, parisSong4];
const londonPlaylist = [londonSong1, londonSong2, londonSong3, londonSong4];
const germanPlaylist = [germanSong1, germanSong2];

function App() {
  const [hasStartRadio, startRadio] = useState<boolean>(false);
  const [isChangingRadio, loadRadio] = useState<boolean>(false);
  const [song, setSong] = useState<0 | 1 | 2>(0);

  // const [muteParis, startParis, isParisPlaying] =
  //   useAudioPlaylist(parisPlaylist);
  // const [muteLondon, startLondon, isLondonPlaying] =
  //   useAudioPlaylist(londonPlaylist);
  // const [muteGerman, startGerman, isGermanPlaying] =
  //   useAudioPlaylist(germanPlaylist);
  const [muteParis, startParis, isParisPlaying] = useAudioURL(
    "https://paris.thunderkerrigan.fr/radio"
  );
  const [muteLondon, startLondon, isLondonPlaying] = useAudioURL(
    "https://londres.thunderkerrigan.fr/radio"
  );
  const [muteGerman, startGerman, isGermanPlaying] = useAudioURL(
    "https://german.thunderkerrigan.fr/radio"
  );

  const startOrStopRadio = () => {
    new Audio(switchSound).play();
    startRadio((prev) => !prev);
  };

  useEffect(() => {
    if (hasStartRadio) {
      if (!isParisPlaying) {
        startParis();
      }
      if (!isLondonPlaying) {
        startLondon();
      }
      if (!isGermanPlaying) {
        startGerman();
      }
    }
  }, [
    hasStartRadio,
    isGermanPlaying,
    isLondonPlaying,
    isParisPlaying,
    startGerman,
    startLondon,
    startParis,
  ]);

  useEffect(() => {
    if (!hasStartRadio) {
      muteLondon(true);
      muteParis(true);
      muteGerman(true);
      return;
    }
  }, [muteLondon, muteParis, muteGerman, hasStartRadio]);

  const changeRadio = () => {
    setSong((prev) => {
      const nextSong = prev + 1;
      if (nextSong > 2) {
        return 0;
      }
      return nextSong as 0 | 1 | 2;
    });
  };

  useEffect(() => {
    if (hasStartRadio) {
      loadRadio(true);
      const audio = new Audio(tuningSound);
      audio.play();
      audio.playbackRate = 1 + Math.random() * 1.5;
      audio.onended = () => {
        loadRadio(false);
      };
    }
  }, [hasStartRadio, song]);

  useEffect(() => {
    if (!hasStartRadio) {
      return;
    }

    if (isChangingRadio) {
      muteLondon(true);
      muteParis(true);
      muteGerman(true);
      return;
    }
    switch (song) {
      case 0:
        muteParis(false);
        break;
      case 1:
        muteLondon(false);
        break;
      case 2:
        muteGerman(false);
        break;
      default:
        break;
    }
  }, [muteLondon, muteParis, muteGerman, song, hasStartRadio, isChangingRadio]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Backdrop />
      <Radio
        onSwitchTuning={() => changeRadio()}
        onSwitchRadio={startOrStopRadio}
        isOn={hasStartRadio}
      />
    </div>
  );
}

export default App;

// Alle Divisionen in die Normandie schicken. Mission Abgrundgeist hat höchste Priorität
