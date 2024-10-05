'use client';
import { ButtonIcon } from '@/components/ui/button-icon';
import { Card } from '@/components/ui/card';
import WaveformZoomControl from '@/components/wavesurfer/waveform-zoom-control';
import {
  Loader2,
  PauseIcon,
  PlayIcon,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';

interface WavesurferAudioWaveformProps {
  audio: string | Blob;
}

function WavesurferAudioWaveform({ audio }: WavesurferAudioWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const zoomRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const initializeWaveSurfer = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAudioReady(false);

    if (!containerRef.current) return;

    try {
      const regions = RegionsPlugin.create();
      regionsRef.current = regions;

      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        url: audio instanceof Blob ? URL.createObjectURL(audio) : audio,
        minPxPerSec: zoomRef.current,
        height: 100,
        plugins: [
          regions,
          TimelinePlugin.create({
            container: '#timeline',
            timeInterval: 5,
          }),
        ],
        autoScroll: false,
      });

      wavesurferRef.current = wavesurfer;

      wavesurfer.on('ready', () => {
        setLoading(false);
        setAudioReady(true);
      });

      wavesurfer.on('error', (err) => {
        console.error('WaveSurfer error:', err);
        setError(`Error: ${err}`);
        setLoading(false);
      });

      wavesurfer.on('play', () => setPlaying(true));
      wavesurfer.on('pause', () => setPlaying(false));
      wavesurfer.on('finish', () => setPlaying(false));

      // Handle manual scrolling
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', () => {
          if (!isScrolling) {
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 100);
          }
        });
      }

      await wavesurfer.load(
        audio instanceof Blob ? URL.createObjectURL(audio) : audio
      );
    } catch (err) {
      console.error('Error initializing WaveSurfer:', err);
      setError(`Error initializing audio player: ${err}`);
      setLoading(false);
    }
  }, [audio, isScrolling]);

  const handlePlayPause = useCallback(() => {
    if (audioReady && wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  }, [audioReady]);

  const handleSkip = useCallback(
    (seconds: number) => {
      if (audioReady && wavesurferRef.current) {
        wavesurferRef.current.skip(seconds);
      }
    },
    [audioReady]
  );

  const handleZoomChange = useCallback(
    (newZoom: number) => {
      if (audioReady && wavesurferRef.current) {
        zoomRef.current = newZoom;
        wavesurferRef.current.zoom(newZoom);
      }
    },
    [audioReady]
  );

  useEffect(() => {
    initializeWaveSurfer();
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [initializeWaveSurfer]);

  if (error) {
    console.log(error);
  }

  return (
    <div className="space-y-5">
      {loading && (
        <div className="w-full">
          <Loader2 className="mx-auto size-4 animate-spin" />
        </div>
      )}
      <div className="relative">
        <Card ref={containerRef} className="h-auto overflow-x-auto"></Card>
      </div>
      <div id="timeline"></div>
      <WaveformZoomControl
        initialZoom={zoomRef.current}
        onZoomChange={handleZoomChange}
        disabled={!audioReady}
      />
      <div className="flex items-center justify-center gap-3">
        <ButtonIcon
          variant={'secondary'}
          icon={SkipBack}
          onClick={() => handleSkip(-5)}
          disabled={!audioReady}
          size={'sm'}
          className="text-xs"
        >
          Backward 5s
        </ButtonIcon>
        <ButtonIcon
          icon={playing ? PauseIcon : PlayIcon}
          onClick={handlePlayPause}
          disabled={!audioReady}
          variant={'secondary'}
          size={'sm'}
          className="text-xs"
        />
        <ButtonIcon
          variant={'secondary'}
          icon={SkipForward}
          onClick={() => handleSkip(5)}
          disabled={!audioReady}
          size={'sm'}
          className="text-xs"
          iconPosition="right"
        >
          Forward 5s
        </ButtonIcon>
      </div>
    </div>
  );
}

export default React.memo(WavesurferAudioWaveform);
