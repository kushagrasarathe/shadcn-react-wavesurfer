import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="flex items-center justify-between p-10 pb-0">
      <div className="text-sm">
        Made by: &nbsp;
        <Link
          href={'https://x.com/kushagrasarathe'}
          className="hover:underline"
        >
          @kushagrasarathe
        </Link>
      </div>
      <div>
        <Link
          href={'https://github.com/kushagrasarathe/react-wavesurfer'}
          className="flex items-center gap-1 text-sm hover:underline"
        >
          <Github size={16} />
          GitHub
        </Link>
      </div>
    </div>
  );
}
