import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./styles.scss";
interface IActionBtnProps {
  onClickFunction?: any;
}
export const EditActionBtn = ({ onClickFunction }: IActionBtnProps) => {
  return (
    <div className={"edit btn"} role={"button"} onClick={onClickFunction}>
      <FontAwesomeIcon icon={solid("pen-to-square")} />
    </div>
  );
};

export const DetailedInfoActionBtn = ({ onClickFunction }: IActionBtnProps) => {
  return (
    <div className={"detail btn"} role={"button"} onClick={onClickFunction}>
      <FontAwesomeIcon icon={solid("info")} />
    </div>
  );
};
