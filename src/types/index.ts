export interface Memory {
  id: string;
  title: string;
  emoji: string;
  date: string;
  x: number;
  y: number;
  text: string;
  image: string | null;
}

export interface HeartCard {
  id: string;
  title: string;
  emoji: string;
  content: string;
}

export interface Location {
  name: string;
  city: string;
  lat: number;
  lng: number;
}

export interface LoveLetter {
  heading: string;
  subtitle: string;
  paragraphs: string[];
}

export interface ParticleProps {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}
