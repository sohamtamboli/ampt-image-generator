'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import floatingisland from '@/public/images/floatingisland.webp';
const Modal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={toggleModal}
        type="button"
      >
        Toggle modal
      </button>

      {/* Main modal */}
      {modalVisible && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
        >
          {/* Modal content */}
          <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between rounded-t border-b p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Description
              </h3>
              <button
                type="button"
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                data-modal-hide="default-modal"
                onClick={toggleModal}
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="flex flex-row space-y-6  border-b p-6 ">
              <Image
                src={floatingisland} // Path to the image inside the `public` directory
                alt="Description of my image"
                width={300} // Width of the image
                height={200} // Height of the image
                className="pr-4"
              />
              <div className="border-l  border-gray-400 pl-4">
                <h1>Prompt :</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi, harum quo! Tempora totam recusandae, est expedita
                  eveniet saepe labore iste possimus qui facilis sit corrupti,
                  sed voluptates animi necessitatibus provident!
                </p>
              </div>
            </div>
            {/* Modal footer */}
            {/* <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={toggleModal}
              >
                I accept
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={toggleModal}
              >
                Decline
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
