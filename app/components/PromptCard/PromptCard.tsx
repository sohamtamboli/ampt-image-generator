'use client';

import clipboard from '@/public/images/clipboard.svg';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { Fragment, useRef, useState } from 'react';
import Prompts from './Prompts';

interface PromptCardProps {
  onPromptClick: (prompt: string) => void;
}
const PromptCard: React.FC<PromptCardProps> = ({ onPromptClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [hoveredPromptIndex, setHoveredPromptIndex] = useState<number | null>(
    null,
  );
  const promptRef = useRef<HTMLParagraphElement>(null);

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = (prompt: string) => {
    
    copyTextToClipboard(prompt)
      .then(() => {
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
     console.error(err);
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
                <div className="relative flex cursor-pointer items-center rounded-md p-2 hover:bg-blue-200">
                  <p
                    className="text-sm font-medium"
                    ref={promptRef}
                    onClick={() => {
                      handleCopyClick(prompt);
                      onPromptClick(prompt);
                    }}
                    onMouseEnter={() => setHoveredPromptIndex(idx)}
                    onMouseLeave={() => setHoveredPromptIndex(null)}
                  >
                    {prompt}
                  </p>
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
