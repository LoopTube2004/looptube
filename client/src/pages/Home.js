import VideoForm from "../components/VideoForm";
import IFrame from "../components/IFrame"
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.home}>
      <VideoForm />

    </div>
  );
};

export default Home;
