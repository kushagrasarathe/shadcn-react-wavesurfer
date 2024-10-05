import React, { useCallback, useEffect, useState } from 'react';
import { Slider } from '../ui/slider';

interface TimelineZoomControlProps {
  initialZoom: number;
  onZoomChange: (zoom: number) => void;
  disabled: boolean;
}

function WaveformZoomControl({
  initialZoom,
  onZoomChange,
  disabled,
}: TimelineZoomControlProps) {
  const [zoom, setZoom] = useState(initialZoom);

  const handleZoomChange = useCallback(
    (value: number[]) => {
      const newZoom = value[0];
      setZoom(newZoom);
      onZoomChange(newZoom);
    },
    [onZoomChange]
  );

  useEffect(() => {
    setZoom(initialZoom);
  }, [initialZoom]);

  return (
    <Slider
      className="cursor-pointer"
      disabled={disabled}
      min={10}
      max={1000}
      value={[zoom]}
      onValueChange={handleZoomChange}
    />
  );
}

export default React.memo(WaveformZoomControl);
