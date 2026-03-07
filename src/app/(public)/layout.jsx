import Navbar from "@/components/Navbar";

/**
 * Public Pages Layout
 * Includes Navbar for home, login, register, etc.
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
