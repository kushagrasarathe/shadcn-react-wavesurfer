import ShadcnAudioUpload from '@/components/wavesurfer/shadcn-audio-upload';

export default function Home() {
  return (
    <main className="flex min-h-[90vh] items-center justify-center p-10">
      <div className="w-7/12">
        <ShadcnAudioUpload />
      </div>
    </main>
  );
}
