import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import clsx from 'clsx';
import type { CardData } from '../types';

interface CardProps {
  card: CardData;
  index: number;
}

export function Card({ card, index }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSelected, setIsSelected] = useState(false); // State for selection

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelectToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking the button
    setIsSelected(prev => !prev);
  };

  const handleCardClick = () => {
    // Only flip if not dragging and the card is not selected
    // Or allow flipping even if selected? Let's allow flipping for now.
    setIsFlipped(prev => !prev);
  };

  return (
    <div className="relative pb-8">
      {/* Placeholder */}
      <div className={clsx(
        'absolute -inset-6 rounded-2xl bg-white/50 backdrop-blur-sm',
        'border border-white/20 shadow-sm -z-10 pb-8',
        isDragging ? 'opacity-0' : 'opacity-100',
        isSelected && 'opacity-50' // Apply grey-out to placeholder too
      )}>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Drag Ghost */}
      {isDragging && (
        <div className={clsx(
          'absolute top-0 left-1/2 -translate-x-1/2',
          'w-[85%] aspect-[3/2] z-0',
          'bg-white/80 rounded-xl border-2 border-apple-blue/30',
          'shadow-2xl pointer-events-none'
        )} />
      )}

      {/* Card */}
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={clsx(
          'relative w-[85%] mx-auto aspect-[3/2] cursor-grab active:cursor-grabbing perspective-1000',
          isDragging ? 'z-10' : 'z-1',
          isSelected && 'opacity-50 grayscale' // Apply grey-out effect
        )}
        whileHover={{ scale: isSelected ? 1 : 1.02 }} // Disable hover scale when selected
        onClick={handleCardClick}
      >
        <motion.div
          className="w-full h-full relative preserve-3d transition-transform duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front of card */}
          <div className={clsx(
            'absolute inset-0 backface-hidden',
            'bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center', // Center content
            'border border-gray-100',
            isDragging && 'shadow-2xl ring-2 ring-apple-blue/30'
          )}>
            <h3 className="text-xl font-medium text-gray-900 text-center">{card.title}</h3>
            {/* Removed summary paragraph */}
            <button
              onClick={handleSelectToggle}
              className={clsx(
                "absolute bottom-4 right-4 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 z-20",
                isSelected
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-apple-blue text-white hover:bg-blue-600"
              )}
            >
              BINGO {/* Updated Button Text */}
            </button>
          </div>

          {/* Back of card */}
          <div className={clsx(
            'absolute inset-0 backface-hidden rotate-y-180',
            'bg-gray-200 rounded-xl shadow-lg p-6',
            'border border-gray-100',
            isDragging && 'shadow-2xl ring-2 ring-apple-blue/30'
          )}>
            <p className="text-sm text-gray-600 leading-relaxed">{card.detail}</p>
             <button
              onClick={handleSelectToggle}
              className={clsx(
                "absolute bottom-4 right-4 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 z-20",
                 isSelected
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-apple-blue text-white hover:bg-blue-600"
              )}
            >
              BINGO {/* Updated Button Text */}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
