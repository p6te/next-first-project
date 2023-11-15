import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/reviews"}>Reviews</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          Game data and images courtesy of{" "}
          <a href="https:/rawg.io/" target="_blank">
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
};
export default RootLayout;
