import styles from "./VideoForm.module.css";
import { useState } from "react";
import { FetchYoutubeData } from "../scripts/FetchYoutubeData";
import { validateYouTubeLink } from "../scripts/YoutubeValidator";
import { getIdYoutubeVideo } from "../scripts/FetchYoutubeData";
import IFrame from "./IFrame";

const VideoForm = (props) => {
  return (
    <div>
      <form className={styles["video-form"]} onSubmit={props.handleSubmit}>
        <h1>LoopTube</h1>
        <h3>Fill your form</h3>

        <div className={styles["input-group"]}>
          {/* We need to group <label> and <input> in same line        */}
          <label>Youtube Url</label>
          <input
            type="text"
            onChange={(e) => props.setUrl(e.target.value)}
            value={props.url}
            placeholder="Enter your youtube url here..."
          />
        </div>
        <div className={styles["time-input-group"]}>
          <label>Start (hh:mm:ss)</label>
          <input
            type="number"
            min="0" //So the value of input cannot be negative
            step="1" //only accept integer
            onChange={(e) => props.setStartHour(e.target.value)}
            value={props.startHour}
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => props.setStartMinute(e.target.value)}
            value={props.startMinute}
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => props.setStartSecond(e.target.value)}
            value={props.startSecond}
          />
        </div>
        <div className={styles["time-input-group"]}>
          <label>End (hh:mm:ss)</label>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => props.setEndHour(e.target.value)}
            value={props.endHour}
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => props.setEndMinute(e.target.value)}
            value={props.endMinute}
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => props.setEndSecond(e.target.value)}
            value={props.endSecond}
          />
        </div>
        <div className={styles["input-group"]}>
          <label>Customize</label>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => props.setCustomize(e.target.value)}
            value={props.customize}
          />
        </div>

        <div className={styles["button-container"]}>
          <button type="submit">Submit</button>
        </div>

        {props.errors.length > 0 && (
          <div>
            {props.errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default VideoForm;
