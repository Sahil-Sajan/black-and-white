import React from 'react';

const NicotineWarningMarquee = () => {
    const warningText = "WARNING: This product contains nicotine. Nicotine is an addictive chemical.";

    // Repeated text to ensure coverage
    const repeatedText = Array(10).fill(warningText);

    return (
        <div className="relative flex overflow-hidden border-b border-gray-200 bg-white py-3">
            {/* Changed: Added inline style to control duration.
                Increasing '60s' will make it even slower.
            */}
            <div
                className="flex whitespace-nowrap animate-marquee"
                style={{ animationDuration: '60s' }}
            >

                {/* First set of text */}
                <div className="flex shrink-0">
                    {repeatedText.map((text, i) => (
                        <span key={`a-${i}`} className="mx-8 text-md font-bold uppercase tracking-wide text-black">
                            {text}
                        </span>
                    ))}
                </div>

                {/* Second set of text (creates the seamless loop) */}
                <div className="flex shrink-0">
                    {repeatedText.map((text, i) => (
                        <span key={`b-${i}`} className="mx-8 text-sm font-bold uppercase tracking-wide text-black">
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            {/* Fade edges for aesthetic look */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
        </div>
    );
};

export default NicotineWarningMarquee;