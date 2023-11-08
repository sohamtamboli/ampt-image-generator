'use client';

import React, { Fragment, useRef, useState } from 'react';
import Prompts from './Prompts';
import clipboard from '@/public/images/clipboard.svg';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';

interface PromptCardProps {
  onPromptClick: (prompt: string) => void;
}
const PromptCard: React.FC<PromptCardProps> = ({ onPromptClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [hoveredPromptIndex, setHoveredPromptIndex] = useState<number | null>(
    null,
  );
  const promptRef = useRef<HTMLParagraphElement>(null);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = (prompt: string) => {
    console.log('it ran', prompt);
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(prompt)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
        enqueueSnackbar({
          message: 'Prompt copied!',
          variant: 'success',
        });
      })

      .catch((err) => {
        console.log(err);
        enqueueSnackbar({
          message: 'Copy failed. Please try again.',
          variant: 'error',
        });
      });
  };

  return (
    <div className="mx-1 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-8">
      <div className="mb-4 flex items-center justify-start">
        <h5 className="text-xl font-bold leading-none ">
          Prompts to get started!
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="prompt__card max-h-[300px] divide-gray-200 overflow-y-scroll md:max-h-[600px]"
        >
          {Prompts.map((prompt, idx) => (
            <Fragment key={idx}>
              <li className="py-3 sm:py-4">
                <div className="flex cursor-pointer items-center">
                  <p
                    className="text-sm font-medium"
                    ref={promptRef}
                    onClick={() => {
                      handleCopyClick(prompt);
                      // Call the onPromptClick function with the clicked prompt
                      onPromptClick(prompt);
                    }}
                    onMouseEnter={() => setHoveredPromptIndex(idx)}
                    onMouseLeave={() => setHoveredPromptIndex(null)}
                  >
                    {prompt}
                  </p>
                  {hoveredPromptIndex === idx && (
                    <span className="tooltip-text  rounded-lg bg-white px-2 py-1 text-sm text-white opacity-100">
                      <Image
                        src={clipboard}
                        width={50}
                        height={40}
                        alt="Picture of the author"
                      />
                    </span>
                  )}
                </div>
              </li>
              <hr />
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromptCard;
