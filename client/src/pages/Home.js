import VideoForm from "../components/VideoForm";
import IFrame from "../components/IFrame"
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.home}>
      <VideoForm />
      <IFrame youtubeID="MwDYOJNlljE" start="2" end="7" time="3" />
    </div>
  );
};

export default Home;
