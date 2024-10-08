'use client';
import { Fragment, type PropsWithChildren, FC } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type FormSlideOverProps = {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const FormSlideOver: FC<PropsWithChildren<FormSlideOverProps>> = (props) => {
  const { title = 'Panel Title', open = true, setOpen, children } = props;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="flex flex-col pointer-events-auto w-screen max-w-2xl bg-secondary text-secondary-foreground max-h-full p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6">{title}</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" className="relative rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => setOpen(false)}>
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 max-h-[93%] overflow-hidden overflow-y-auto px-1">{children}</div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
