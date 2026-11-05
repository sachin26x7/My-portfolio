import React, { useEffect, useRef } from 'react';

type MotionCardProps = React.HTMLAttributes<HTMLDivElement>;

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export const MotionCard: React.FC<MotionCardProps> = ({ className = '', children, ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia(reducedMotionQuery).matches || !('IntersectionObserver' in window)) return;

    card.classList.add('motion-card--pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      card.classList.remove('motion-card--pending');
      card.classList.add('motion-card--visible');
      observer.unobserve(card);
    }, { threshold: 0.12 });

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia(reducedMotionQuery).matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width;
    const pointerY = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--card-tilt-x', `${((0.5 - pointerY) * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--card-tilt-y', `${((pointerX - 0.5) * 6).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--card-light-x', `${(pointerX * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty('--card-light-y', `${(pointerY * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty('--card-tilt-x');
    event.currentTarget.style.removeProperty('--card-tilt-y');
    event.currentTarget.style.removeProperty('--card-light-x');
    event.currentTarget.style.removeProperty('--card-light-y');
  };

  return (
    <div
      {...props}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`motion-card ${className}`}
    >
      {children}
    </div>
  );
};
