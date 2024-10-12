# Shadcn React Wavesurfer

A React component to render audio files using Wavesurfer.js, built with Shadcn-UI.

## Installation

To install the component, use npm or yarn:

```bash
npm install shadcn-react-wavesurfer
# or
yarn add shadcn-react-wavesurfer
```
## Usage

Here’s a basic example of how to use the component in your React application:

```bash
import React from 'react';
import ShadcnReactWavesurfer from 'shadcn-react-wavesurfer';

const App = () => {
  return (
    <div>
      <h1>Audio Player</h1>
      <ShadcnReactWavesurfer
        audioUrl="path/to/your/audio/file.mp3"
        waveColor="#ddd"
        progressColor="#ff5500"
      />
    </div>
  );
};

export default App;
```
## Props

The ShadcnReactWavesurfer component accepts the following props:
| Parameter      | Type    | Default    | Description                                      |
|----------------|---------|------------|--------------------------------------------------|
| `audioUrl`     | string  | null       | URL of the audio file to be played.              |
| `waveColor`    | string  | #ddd       | Color of the waveform.                           |
| `progressColor`| string  | #ff5500    | Color of the progress bar.                       |
| `height`       | number  | 128        | Height of the waveform.                          |
| `barWidth`     | number  | 2          | Width of the bars in the waveform.               |
| `barGap`       | number  | 2          | Gap between the bars in the waveform.            |
| `responsive`   | boolean | true       | Whether the waveform should be responsive.       |

## Customization

You can customize the appearance and behavior of the waveform by passing different props to the ShadcnReactWavesurfer component. For example:
```bash
<ShadcnReactWavesurfer
  audioUrl="path/to/your/audio/file.mp3"
  waveColor="#000"
  progressColor="#00f"
  height={200}
  barWidth={3}
  barGap={1}
/>
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Make your changes.
    Commit your changes (git commit -m 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Open a pull request.
## License

This project is licensed under the MIT License. See the LICENSE file for details.
