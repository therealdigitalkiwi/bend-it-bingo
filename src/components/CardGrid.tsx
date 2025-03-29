import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { Card } from './Card';
import type { CardData } from '../types';

// Updated card data based on user input
const initialCards: CardData[] = [
  {
    id: '1',
    title: 'Close-Up on Emotion',
    summary: 'Close-Up on Emotion', // Keep summary as title for consistency
    detail: 'Find a shot framed tightly on a character, drawing attention to their facial expression and hinting at their internal state.'
  },
  {
    id: '2',
    title: 'Mood Music',
    summary: 'Mood Music',
    detail: 'Notice when background music (that the characters likely can\'t hear) is used to influence how the audience feels about what\'s happening on screen.'
  },
  {
    id: '3',
    title: 'Culture Clash Moment',
    summary: 'Culture Clash Moment',
    detail: 'Spot a scene where different cultural beliefs, values, or ways of doing things create visible tension or misunderstanding between characters.'
  },
  {
    id: '4',
    title: 'Significant Costume/Prop',
    summary: 'Significant Costume/Prop',
    detail: 'See an object or item of clothing that seems deliberately chosen to tell us something important about a person, their background, or the situation.'
  },
  {
    id: '5',
    title: 'Establishing Long Shot',
    summary: 'Establishing Long Shot',
    detail: 'Find a shot taken from a distance that shows a wide view of the location and where the characters are positioned within that environment.'
  },
  {
    id: '6',
    title: 'Breaking Expectations',
    summary: 'Breaking Expectations',
    detail: 'Witness a character acting in a way that challenges what others, or perhaps society in general, might expect from someone like them.'
  },
  {
    id: '7',
    title: 'Revealing Dialogue',
    summary: 'Revealing Dialogue',
    detail: 'Hear a line spoken by a character that gives the audience a key insight into their personality, motivations, or what they are truly thinking.'
  },
  {
    id: '8',
    title: 'Editing for Contrast/Pace',
    summary: 'Editing for Contrast/Pace',
    detail: 'Notice how the film cuts between shots – perhaps very quickly to create energy, slowly to build feeling, or cutting between different scenes to draw a comparison.'
  },
  {
    id: '9',
    title: 'Prejudice Shown',
    summary: 'Prejudice Shown',
    detail: 'See or hear an instance where a character is treated unfairly or negatively based on assumptions about a group they belong to.'
  },
  {
    id: '10',
    title: 'Symbolic Action/Image',
    summary: 'Symbolic Action/Image',
    detail: 'Spot an action or a visual element that seems to stand for more than just its literal meaning, representing a larger concept or idea relevant to the story.'
  },
];

export function CardGrid() {
  const [cards, setCards] = useState(initialCards);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Prevent dropping onto a selected card? For now, allow it.
        // Consider if selected cards should be draggable or droppable targets.

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleReset() {
    // Resetting order should also reset selection state.
    // Since selection state is local to Card, we need a way to trigger reset.
    // Easiest way for now: remount the cards by changing the key.
    // A better way would involve lifting state or using a context/ref.
    setCards([...initialCards]); // Create a new array instance to trigger re-render if needed
  }


  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Bend it Bingo</h1> {/* Updated Title */}
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-white bg-apple-blue rounded-full
            hover:bg-blue-600 transition-colors duration-200"
        >
          Reset Order &amp; Selections
        </button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={cards} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use card.id + a potential reset counter as key if needed for full reset */}
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
