import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <header>[header]</header>
        {children}
        <footer>[footer]</footer>
      </body>
    </html>
  );
};
export default RootLayout;
