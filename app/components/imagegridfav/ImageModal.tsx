import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { IBookmarkedImagesResponse } from './imagegridfav';

type ImageModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  photo: IBookmarkedImagesResponse;
};

const ImageModal = ({ closeModal, isOpen, photo }: ImageModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-1 text-left align-middle shadow-xl transition-all">
                  <div className="relative h-auto max-w-full pb-[100%]">
                    <Image
                      src={photo.value}
                      alt={'fav image'}
                      className="relative rounded-lg"
                      layout="fill"
                      objectFit="cover"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Ww8AAj8BXkQ+xPEAAAAASUVORK5CYII="
                    />
                  </div>
                  <Dialog.Description>
                    <div className="my-2 bg-white px-2">
                      <p className="text-md text-gray-900">
                        <b>Prompt: </b>
                        {photo.promt}
                      </p>
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ImageModal;
