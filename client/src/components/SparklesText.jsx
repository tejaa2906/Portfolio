import { useEffect, useRef, useState } from "react";

const defaultColors = {
  first: "#f3c969",
  second: "#ef9fc4"
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createSparkle(id, colors) {
  return {
    id,
    color: Math.random() > 0.5 ? colors.first : colors.second,
    left: `${randomBetween(-6, 106)}%`,
    top: `${randomBetween(-18, 108)}%`,
    size: `${randomBetween(12, 22)}px`,
    delay: `${randomBetween(-1.6, 0)}s`,
    duration: `${randomBetween(1.9, 3.2)}s`,
    rotation: `${randomBetween(0, 180)}deg`
  };
}

function buildSparkles(count, colors, idRef) {
  return Array.from({ length: count }, () => {
    const sparkle = createSparkle(idRef.current, colors);
    idRef.current += 1;
    return sparkle;
  });
}

function SparklesText({
  children,
  className = "",
  sparklesCount = 10,
  colors = defaultColors
}) {
  const idRef = useRef(0);
  const [sparkles, setSparkles] = useState(() =>
    buildSparkles(sparklesCount, colors, idRef)
  );

  useEffect(() => {
    setSparkles(buildSparkles(sparklesCount, colors, idRef));
  }, [sparklesCount, colors.first, colors.second]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSparkles((currentSparkles) => {
        if (!currentSparkles.length) {
          return currentSparkles;
        }

        const nextSparkles = [...currentSparkles];
        const index = Math.floor(Math.random() * nextSparkles.length);
        nextSparkles[index] = createSparkle(idRef.current, colors);
        idRef.current += 1;
        return nextSparkles;
      });
    }, 420);

    return () => window.clearInterval(interval);
  }, [colors.first, colors.second]);

  return (
    <span className={`sparkles-text ${className}`.trim()}>
      <span className="sparkles-text__content">{children}</span>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkles-text__sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            color: sparkle.color,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation})`,
            "--sparkle-delay": sparkle.delay,
            "--sparkle-duration": sparkle.duration
          }}
        >
          <svg viewBox="0 0 68 68" aria-hidden="true">
            <path d="M34 0L42.6 25.4L68 34L42.6 42.6L34 68L25.4 42.6L0 34L25.4 25.4L34 0Z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

export default SparklesText;
