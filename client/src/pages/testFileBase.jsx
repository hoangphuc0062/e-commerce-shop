import { UploadImage } from "../components";
const apikey = import.meta.env.VITE_FIREBASE_API_KEY;
export default function TestFileBase() {
  console.log(apikey);
  return (
    <div>
      <UploadImage />
    </div>
  );
}
