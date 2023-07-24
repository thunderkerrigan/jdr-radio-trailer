import React from "react";
import radio from "../assets/radio.png";
import radioButton from "../assets/Button.png";
import "./Radio.scss";
import Dossier from "../dossier/Dossier";

type RadioProps = {
  onSwitchRadio: () => void;
  onSwitchTuning: () => void;
  isOn: boolean;
};

const Radio = ({ onSwitchTuning, onSwitchRadio, isOn }: RadioProps) => {
  const [rotation, setRotation] = React.useState([0, -45, -100]);

  const changeRotation = () => {
    setRotation((prev) => {
      const last = prev[0];
      return [...prev.slice(1), last];
    });
    onSwitchTuning();
  };

  return (
    <div className="radio-background">
      <div className="radio-container">
        <div className="radio-switch" onClick={onSwitchRadio} />
        <div className={`radio-light-${isOn ? "on" : "off"}`} />
        <img className="radio" src={radio} />
        <img
          className="radio-button"
          src={radioButton}
          onClick={changeRotation}
          style={{ transform: `rotate(${rotation[0]}deg)` }}
        />
      </div>
      <Dossier />
    </div>
  );
};

export default Radio;
