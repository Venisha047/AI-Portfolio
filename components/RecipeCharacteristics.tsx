import React from 'react';
import { FlameIcon, SnowflakeIcon, SugarIcon, StrengthIcon } from './icons';

interface RecipeCharacteristicsProps {
  tags: string[];
}

const Characteristic: React.FC<{ Icon: React.FC<{className?: string}>; label: string }> = ({ Icon, label }) => (
  <div className="flex items-center gap-1.5 bg-brown/10 text-brown px-2 py-1 rounded-full">
    <Icon className="text-brown/70"/>
    <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
  </div>
);

export const RecipeCharacteristics: React.FC<RecipeCharacteristicsProps> = ({ tags }) => {
  const upperTags = tags.map(t => t.toUpperCase());
  const characteristicsToRender = [];

  // Temperature
  if (upperTags.includes('HOT')) {
    characteristicsToRender.push(<Characteristic key="temp" Icon={FlameIcon} label="Hot" />);
  } else if (upperTags.includes('ICED') || upperTags.includes('COLD')) {
    characteristicsToRender.push(<Characteristic key="temp" Icon={SnowflakeIcon} label="Iced" />);
  }

  // Sweetness
  if (upperTags.includes('SWEET')) {
    characteristicsToRender.push(<Characteristic key="sweet" Icon={SugarIcon} label="Sweet" />);
  }
  
  // Strength - prioritize strong over medium
  if (upperTags.includes('STRONG') || upperTags.includes('BOLD')) {
    characteristicsToRender.push(<Characteristic key="strength" Icon={StrengthIcon} label="Strong" />);
  } else if (upperTags.includes('MEDIUM')) {
    characteristicsToRender.push(<Characteristic key="strength" Icon={StrengthIcon} label="Medium" />);
  }

  if (characteristicsToRender.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {characteristicsToRender}
    </div>
  );
};