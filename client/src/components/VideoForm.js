import styles from "./VideoForm.module.css";
import { useState } from "react";

const VideoForm = () => {
  const [url, setUrl] = useState("");
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState(0);
  const [endSecond, setEndSecond] = useState(0);
  const [customize, setCustomize] = useState(0);
  const [error, setError] = useState(null);

  return (
    <form className={styles["video-form"]}>
      <h1>LoopTube</h1>
      <h3>Fill your form</h3>

      <div className={styles["input-group"]}>
        {" "}
        {/* We need to group <label> and <input> in same line  */}
        <label>Youtube Url</label>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
      </div>
      <div className={styles["time-input-group"]}>
        <label>Start</label>
        <input
          type="number"
          onChange={(e) => setStartHour(e.target.value)}
          value={startHour}
        />
        <p>:</p>
        <input
          type="number"
          onChange={(e) => setStartMinute(e.target.value)}
          value={startMinute}
        />
        <p>:</p>
        <input
          type="number"
          onChange={(e) => setStartSecond(e.target.value)}
          value={startSecond}
        />
      </div>
      <div className={styles["time-input-group"]}>
        <label>End</label>
        <input
          type="number"
          onChange={(e) => setEndHour(e.target.value)}
          value={endHour}
        />
        <p>:</p>
        <input
          type="number"
          onChange={(e) => setEndMinute(e.target.value)}
          value={endMinute}
        />
        <p>:</p>
        <input
          type="number"
          onChange={(e) => setEndSecond(e.target.value)}
          value={endSecond}
        />
      </div>
      <div className={styles["input-group"]}>
        <label>Customize</label>
        <input
          type="number"
          onChange={(e) => setCustomize(e.target.value)}
          value={customize}
        />
      </div>

      <div className={styles["button-container"]}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default VideoForm;
