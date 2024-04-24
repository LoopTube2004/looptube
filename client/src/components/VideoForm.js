import styles from "./VideoForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartHour,
  updateStartMinute,
  updateStartSecond,
  updateEndHour,
  updateEndMinute,
  updateEndSecond,
  updateUrl,
  updateCustomize,
} from "../features/formSlice";

const VideoForm = (props) => {
  const dispatch = useDispatch();
  const startHour = useSelector((state) => state.form.startHour);
  const startMinute = useSelector((state) => state.form.startMinute);
  const startSecond = useSelector((state) => state.form.startSecond);
  const endHour = useSelector((state) => state.form.endHour);
  const endMinute = useSelector((state) => state.form.endMinute);
  const endSecond = useSelector((state) => state.form.endSecond);
  const url = useSelector((state) => state.form.url);
  const customize = useSelector((state) => state.form.customize);
  return (
    <form className={styles["video-form"]} onSubmit={props.handleSubmit}>
      <h1>LoopTube</h1>
      <h3>Loop your favorite YouTube part here 👇</h3>

      <div className={styles["input-group"]}>
        {/* We need to group <label> and <input> in same line        */}
        <label>Youtube Url</label>
        <input
          type="text"
          onChange={(e) => dispatch(updateUrl(e.target.value))}
          value={url}
          placeholder="Enter your youtube url here..."
        />
      </div>
      <div className={styles["time-input-group"]}>
        <label>Start (hh:mm:ss)</label>
        <input
          type="number"
          min="0" //So the value of input cannot be negative
          step="1" //only accept integer
          onChange={(e) => dispatch(updateStartHour(e.target.value))}
          value={startHour}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => dispatch(updateStartMinute(e.target.value))}
          value={startMinute}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => dispatch(updateStartSecond(e.target.value))}
          value={startSecond}
        />
      </div>
      <div className={styles["time-input-group"]}>
        <label>End (hh:mm:ss)</label>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => dispatch(updateEndHour(e.target.value))}
          value={endHour}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => dispatch(updateEndMinute(e.target.value))}
          value={endMinute}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => dispatch(updateEndSecond(e.target.value))}
          value={endSecond}
        />
      </div>
      <div className={styles["input-group"]}>
        <label>Customize</label>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => dispatch(updateCustomize(e.target.value))}
          value={customize}
        />
      </div>

      <div className={styles["button-container"]}>
        <button className={styles["submit-button"]} type="submit">
          Submit
        </button>
      </div>

      {props.errors.length > 0 && (
        <div>
          {props.errors.map((error, index) => (
            <p key={index} className={styles["error"]}>
              {error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
};

export default VideoForm;
