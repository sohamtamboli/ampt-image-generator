import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer text-sm">
      <div className="justify-left flex flex-col items-center gap-1 p-2 text-neutral-900 sm:flex-row sm:gap-2">
        <span className="text-neutral-900">© {new Date().getFullYear()} </span>
        <Link href="https://ampt.dev/" className="text-neutral-400">
          AMPT-POC-IMAGE-GENERATOR
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
