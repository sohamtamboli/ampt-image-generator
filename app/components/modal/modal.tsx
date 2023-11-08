// 'use client';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import floatingisland from '@/public/images/floatingisland.webp';
// const Modal: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   const toggleModal = (): void => {
//     setModalVisible(!modalVisible);
//   };

//   return (
//     <>
//       {/* Modal toggle */}
//       <button
//         data-modal-target="default-modal"
//         data-modal-toggle="default-modal"
//         className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         onClick={toggleModal}
//         type="button"
//       >
//         Toggle modal
//       </button>

//       {/* Main modal */}
//       {modalVisible && (
//         <div
//           id="default-modal"
//           tabIndex={-1}
//           aria-hidden="true"
//           className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
//         >
//           {/* Modal content */}
//           <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow">
//             {/* Modal header */}
//             <div className="flex items-start justify-between rounded-t border-b p-4">
//               <h3 className="text-xl font-semibold text-gray-900">
//                 Description
//               </h3>
//               <button
//                 type="button"
//                 className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
//                 data-modal-hide="default-modal"
//                 onClick={toggleModal}
//               >
//                 <svg
//                   className="h-3 w-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 14 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div>
//             {/* Modal body */}
//             <div className="max-sm flex flex-row  space-y-6 border-b  p-6">
//               <Image
//                 src={floatingisland} // Path to the image inside the `public` directory
//                 alt="Description of my image"
//                 width={300} // Width of the image
//                 height={200} // Height of the image
//                 className="pr-4"
//               />
//               <div className="border-l  border-gray-400 pl-4">
//                 <h1>Prompt :</h1>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Commodi, harum quo! Tempora totam recusandae, est expedita
//                   eveniet saepe labore iste possimus qui facilis sit corrupti,
//                   sed voluptates animi necessitatibus provident!
//                 </p>
//                 <button
//                   data-modal-hide="default-modal"
//                   type="button"
//                   className="mt-2 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                   onClick={toggleModal}
//                 >
//                   Delete image
//                 </button>
//               </div>
//             </div>
//             {/* Modal footer */}
//             {/* <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6">
//               <button
//                 data-modal-hide="default-modal"
//                 type="button"
//                 className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                 onClick={toggleModal}
//               >
//                 I accept
//               </button>
//               <button
//                 data-modal-hide="default-modal"
//                 type="button"
//                 className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                 onClick={toggleModal}
//               >
//                 Decline
//               </button>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;
'use client';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import floatingisland from '@/public/images/floatingisland.webp';

interface MyModalProps {
  imageUrl: string;
  prompt: string;
}
export default function Modal({ imageUrl, prompt }: MyModalProps) {
  // Your component logic remains the same
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" flex min-h-full items-center justify-center p-4 text-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed  bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="h-auto w-100vw  flex  items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="  transform overflow-hidden rounded-2xl bg-white p-6  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-lg  font-medium leading-6 text-gray-900"
                  >
                    <button
                      type="button"
                      className="ml-auto  inline-flex  items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                      data-modal-hide="default-modal"
                      onClick={closeModal}
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
                  </Dialog.Title>
                  <div className=" flex justify-center space-y-6 p-6">
                    <Image
                      //   src={imageUrl} // Path to the image inside the `floatingislandpublic` directory
                      src={floatingisland}
                      alt="Description of my image"
                      width={400} // Width of the image
                      height={400} // Height of the image
                      className="pr-4 "
                    />
                  </div>
                  <div className="flex flex-col  rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                    <h1 className="font-semibold ">Prompt :</h1>
                    {/* <p>{prompt}</p> */}
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam vero, qui mollitia minima culpa recusandae officiis
                      quos. Illum, accusamus porro?
                    </p>
                    <button
                      data-modal-hide="default-modal"
                      type="button"
                      className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      I accept
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
