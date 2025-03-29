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
    summary: 'Close-Up on Emotion', // Keep summary as title
    detail: 'A shot zoomed right in on a character\'s face. Clearly shows strong feelings like happiness, sadness, or anger, helping the audience connect with them.'
  },
  {
    id: '2',
    title: 'Mood Music',
    summary: 'Mood Music',
    detail: 'Background music (characters can\'t hear) used to make the audience feel something specific about the scene – like excited, tense, or sad.'
  },
  {
    id: '3',
    title: 'Culture Clash Moment',
    summary: 'Culture Clash Moment',
    detail: 'A scene showing misunderstanding or tension when characters from different cultural backgrounds interact due to different beliefs, rules, or ways of life.'
  },
  {
    id: '4',
    title: 'Significant Costume/Prop',
    summary: 'Significant Costume/Prop',
    detail: 'An important object or piece of clothing that gives visual clues about a character\'s personality, background, feelings, or the situation unfolding.'
  },
  {
    id: '5',
    title: 'Establishing Long Shot',
    summary: 'Establishing Long Shot',
    detail: 'A camera shot from far away showing a wide view of the location (setting). It shows where the scene happens and characters\' positions.'
  },
  {
    id: '6',
    title: 'Breaking Expectations',
    summary: 'Breaking Expectations',
    detail: 'A character acts surprisingly, challenging what others might expect them to do based on their gender, culture, family role, or personality.'
  },
  {
    id: '7',
    title: 'Revealing Dialogue',
    summary: 'Revealing Dialogue',
    detail: 'A line spoken by a character that shows the audience their true thoughts, feelings, secrets, or what they really want. Gives key insight.'
  },
  {
    id: '8',
    title: 'Editing for Contrast/Pace',
    summary: 'Editing for Contrast/Pace',
    detail: 'How the film cuts between shots. Look for fast cuts creating energy, slow cuts for mood, or cutting between different scenes happening at once.'
  },
  {
    id: '9',
    title: 'Prejudice Shown',
    summary: 'Prejudice Shown',
    detail: 'A character is treated unfairly, judged negatively, or insulted because they belong to a certain group (based on race, gender, culture, etc.).'
  },
  {
    id: '10',
    title: 'Symbolic Action/Image',
    summary: 'Symbolic Action/Image',
    detail: 'An action or visual (like an object or colour) that represents a bigger idea beyond its literal meaning, such as freedom, challenge, or hope.'
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
