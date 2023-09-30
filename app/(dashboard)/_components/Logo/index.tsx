import { FunctionComponent } from "react";
import Image from "next/image";
interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  return <Image src="/logo.svg" alt={"logo"} height={40} width={40} />;
};

export default Logo;
