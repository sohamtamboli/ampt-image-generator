import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className="footer flex min-h-full flex-col ">
      <div className="mt-10 ">
        <footer className="bg-gray-800 text-center lg:text-left">
          <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
            © 2023 Copyright:
            <Link
              href="https://ampt.dev/"
              className="text-neutral-800 dark:text-neutral-400"
            >
              {''} AMPT-POC-ICON-GENERATOR
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
