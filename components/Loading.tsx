import Image from "next/image";
import LoadingSvg from "../assets/images/loading.svg";

function Loading() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Image src={LoadingSvg} alt="loading" />
    </div>
  );
}

export default Loading;
