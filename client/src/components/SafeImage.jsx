import { useState } from 'react';

/**
 * Image with a graceful gradient fallback if the URL fails or is slow.
 * Drop-in replacement for <img>.
 */
export default function SafeImage({ src, alt = '', className = '', fallbackGradient, ...rest }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const gradient =
    fallbackGradient ||
    'linear-gradient(135deg, rgba(70,96,255,0.45), rgba(168,85,247,0.4), rgba(20,184,166,0.3))';

  if (failed) {
    return (
      <div
        className={className}
        style={{ background: gradient }}
        aria-label={alt}
        role="img"
      />
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={className}
          style={{ background: gradient, position: 'absolute', inset: 0 }}
          aria-hidden
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        {...rest}
      />
    </>
  );
}
