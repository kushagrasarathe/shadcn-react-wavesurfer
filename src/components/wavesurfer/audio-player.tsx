import React from 'react';
import WavesurferAudioWaveform from './wavesurfer-audio-waveform';

interface AudioPlayerProps {
  audio: string | Blob | null;
  audioVersionId: string;
}

function AudioPlayer({ audio }: AudioPlayerProps) {
  if (!audio) {
    return null;
  }

  return <WavesurferAudioWaveform audio={audio} />;
}

export default React.memo(AudioPlayer);
