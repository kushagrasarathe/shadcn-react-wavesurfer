'use client';

import { ButtonIcon } from '@/components/ui/button-icon';
import AudioPlayer from '@/components/wavesurfer/audio-player';
import { useFileHandler } from '@/lib/hooks/useFileHandler';
import { Loader2, Trash } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import Dropzone from './dropzone';

export default function ShadcnAudioUpload() {
  const { selectedFile, isLoading, error, handleFileChange, clearSelection } =
    useFileHandler();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
    },
    multiple: false,
    noClick: true,
  });

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    open();
  };

  return (
    <Card className="space-y-4">
      <CardContent className="p-4 md:p-6">
        {!selectedFile && !isLoading && (
          <Dropzone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            onClick={handleClick}
          />
        )}

        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {selectedFile && !isLoading && (
          <FilePreview file={selectedFile} clearSelection={clearSelection} />
        )}
      </CardContent>
    </Card>
  );
}

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center text-red-500">{message}</div>
);

const FilePreview = ({
  file,
  clearSelection,
}: {
  file: File;
  clearSelection: () => void;
}) => (
  <div className="relative">
    <AudioPlayer audio={file} audioVersionId={file.name} />
    <div className="absolute bottom-0 right-0">
      <ButtonIcon
        icon={Trash}
        onClick={clearSelection}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      />
    </div>
  </div>
);
