'use client';

import { UploadIcon } from 'lucide-react';

interface DropzoneProps {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
  isDragActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const Dropzone = ({
  getRootProps,
  getInputProps,
  isDragActive,
  onClick,
}: DropzoneProps) => (
  <div {...getRootProps()} className="h-full">
    <label
      htmlFor="dropzone-file"
      className={`dark:hover:bg-bray-800 visually-hidden-focusable relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
        isDragActive ? 'border-blue-500 bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <input {...getInputProps()} id="dropzone-file" />
      <div className="space-y-2 text-center">
        <UploadIcon
          size={16}
          className="max-h-16 w-full object-contain opacity-70"
        />
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            {isDragActive ? 'Drop the audio file here' : 'Select Audio File'}
          </p>
          <p className="text-xs text-gray-400">
            {isDragActive
              ? 'Release to upload'
              : 'Click here to upload an audio file or drag and drop it'}
          </p>
        </div>
      </div>
    </label>
  </div>
);

export default Dropzone;
