import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const Share = () => {
  const location = useLocation();

  const currentUrl = window.location.origin + location.pathname;

  return (
    <div className="flex gap-2">
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default Share;
