import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import Popup from "reactjs-popup";
import loadingAnimation from "../../assets/animations/loadingAnimation.json";
import "./styles.scss";

const LoaderGlobal = () => {
  const { loading, loadingText } = useSelector(({ general }) => general);
  return (
    <Popup modal className="modal-loading-container" open={loading} closeOnDocumentClick={false} closeOnEscape={false}>
      <div className="modal-loading-text">{loadingText}</div>
      <div className="modal-loading-animation">
        <Player src={loadingAnimation} className="player" autoplay loop />
      </div>
    </Popup>
  );
};

export default LoaderGlobal;
