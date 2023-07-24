import React, { useState } from "react";
import dedale from "../assets/fiches/dedale.png";
import berger from "../assets/fiches/berger.png";
import corbeau from "../assets/fiches/corbeau.png";
import duchesse from "../assets/fiches/duchesse.png";
import echiquier from "../assets/fiches/echiquier.png";
import encre from "../assets/fiches/encre.png";
import epervier from "../assets/fiches/epervier.png";
import fantome from "../assets/fiches/fantome.png";
import forgeron from "../assets/fiches/forgeron.png";
import horloger from "../assets/fiches/horloger.png";
import loup from "../assets/fiches/loup.png";
import joueur from "../assets/fiches/joueur.png";
import linx from "../assets/fiches/linx.png";
import poete from "../assets/fiches/poete.png";
import rose from "../assets/fiches/rose.png";
import ruisseau from "../assets/fiches/ruisseau.png";

import back from "../assets/dossier/back.png";
import front_1 from "../assets/dossier/front-1.png";
import front_2 from "../assets/dossier/front-2.png";
import flipSound from "../assets/paper-flip.mp3";

import "./Dossier.scss";

const files = [
  dedale,
  corbeau,
  epervier,
  rose,
  encre,
  forgeron,
  joueur,
  linx,
  ruisseau,
  fantome,
  horloger,
  loup,
  poete,
  duchesse,
  berger,
  echiquier,
];

const rotations = files.map(() => Math.random() * 5 - 2);

const Dossier = () => {
  const [opened, setOpen] = useState(false);
  const [currentDisplayedFile, setDisplayedImage] = useState(-1);
  const changeDisplayedImage = () => {
    setDisplayedImage((prev) => {
      const newIndex = prev + 1;
      const audio = new Audio(flipSound);
      audio.play();
      audio.playbackRate = 1 + Math.random() * 1.5;
      if (newIndex >= files.length) {
        console.log("newIndex", 0);
        return 0;
      }
      console.log("newIndex", newIndex);
      return newIndex;
    });
  };
  const fileItems = files.map((file, index) => (
    <img
      key={file}
      src={file}
      alt="fiche-1"
      style={{ transform: `rotate(${rotations[index]}deg)` }}
      className={`Dossier ${opened ? "opened" : ""} ${
        currentDisplayedFile === index ? "displayed" : ""
      }`}
      onClick={changeDisplayedImage}
    />
  ));
  return (
    <div className={`folder-container ${opened ? "opened" : ""}`}>
      <img
        className={`folder back ${opened ? "opened" : ""}`}
        alt="folder"
        src={back}
      />
      <div className="file-container">{fileItems}</div>
      <img
        className={`folder front ${opened ? "opened" : ""}`}
        alt="folder"
        src={front_2}
        onClick={() => setOpen((prev) => !prev)}
      />
      <img
        className={`folder logo ${opened ? "opened" : ""}`}
        alt="folder"
        src={front_1}
        onClick={() => setOpen((prev) => !prev)}
      />
    </div>
  );
};

export default Dossier;
