import { FunctionComponent } from "react";
import Image from "next/image";
interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  return <Image src="/logo.svg" alt={"logo"} height={60} width={60} />;
};

export default Logo;
