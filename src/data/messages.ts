export type Category = 'You' | 'Home' | 'Love' | 'Family' | 'Friends' | 'School';

export interface Message {
  id: string;
  text: string;
}

export interface CategoryData {
  name: Category;
  emoji: string;
  color: string;
  messages: Message[];
}

export const categoriesData: CategoryData[] = [
  {
    name: 'You',
    emoji: '🧑',
    color: '#E8533F',
    messages: [
      { id: 'y1', text: "Believe in yourself — you are capable of amazing things." },
      { id: 'y2', text: "Every day is a new chance to grow and improve." },
      { id: 'y3', text: "You are enough, exactly as you are right now." },
      { id: 'y4', text: "Your potential is limitless — keep pushing forward." },
    ],
  },
  {
    name: 'Home',
    emoji: '🏠',
    color: '#3A8C7E',
    messages: [
      { id: 'h1', text: "Home is where your story begins." },
      { id: 'h2', text: "The warmth of home is found in the people inside it." },
      { id: 'h3', text: "There is no place like home." },
      { id: 'h4', text: "Home: where every corner holds a memory." },
    ],
  },
  {
    name: 'Love',
    emoji: '❤️',
    color: '#C2185B',
    messages: [
      { id: 'l1', text: "Love is not something you find. Love is something that finds you." },
      { id: 'l2', text: "The best thing to hold onto in life is each other." },
      { id: 'l3', text: "Love is composed of a single soul inhabiting two bodies." },
      { id: 'l4', text: "Where there is love, there is life." },
    ],
  },
  {
    name: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    color: '#6D4C8E',
    messages: [
      { id: 'f1', text: "Family is not an important thing — it is everything." },
      { id: 'f2', text: "The love of family is lifes greatest blessing." },
      { id: 'f3', text: "Family: where life begins and love never ends." },
      { id: 'f4', text: "In family life, love is the oil that eases friction." },
    ],
  },
  {
    name: 'Friends',
    emoji: '🤝',
    color: '#D4822A',
    messages: [
      { id: 'fr1', text: "A good friend knows all your stories. A best friend lived them with you." },
      { id: 'fr2', text: "Friends are the family we choose for ourselves." },
      { id: 'fr3', text: "True friendship comes when silence between two people is comfortable." },
      { id: 'fr4', text: "A real friend is one who walks in when the rest of the world walks out." },
    ],
  },
  {
    name: 'School',
    emoji: '📚',
    color: '#1976A8',
    messages: [
      { id: 's1', text: "Education is the passport to the future." },
      { id: 's2', text: "The beautiful thing about learning is that nobody can take it away from you." },
      { id: 's3', text: "An investment in knowledge pays the best interest." },
      { id: 's4', text: "Live as if you were to die tomorrow. Learn as if you were to live forever." },
    ],
  },
];