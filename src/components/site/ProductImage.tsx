import { useState } from "react";
import { ImageOff } from "lucide-react";

export function ProductImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground ${className}`} role="img" aria-label={`${alt} — image coming soon`}>
        <ImageOff className="size-8" aria-hidden />
        <span className="text-xs">Image coming soon</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-contain bg-paper ${className}`} />;
}
