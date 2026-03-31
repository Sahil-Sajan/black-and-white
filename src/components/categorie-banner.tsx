// components/LeftBanner.tsx
import Image from 'next/image';

export default function LeftBanner() {
    return (
        <div className="relative w-full h-full min-h-[650px] group overflow-hidden rounded-sm">
            <Image
                src="/categories/disposible.png" // Path to your vertical banner
                alt="Check our disposable range"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                priority
            />
        </div>
    );
}