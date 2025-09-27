
import React from 'react';
import { BadgeType } from '../types';
import {
  LeafIcon,
  SnowflakeIcon,
  FlameIcon,
  BoltIcon,
  DumbbellIcon,
  SparkleIcon,
  DropletIcon,
} from './icons/Icons';

const badgeMap: Record<BadgeType, { icon: JSX.Element; text: string }> = {
  [BadgeType.VEGAN]: { icon: <LeafIcon />, text: 'Vegan' },
  [BadgeType.LOW_SUGAR]: { icon: <SparkleIcon />, text: 'Low Sugar' },
  [BadgeType.DAIRY_FREE]: { icon: <DropletIcon />, text: 'Dairy-Free' },
  [BadgeType.ICED]: { icon: <SnowflakeIcon />, text: 'Iced' },
  [BadgeType.HOT]: { icon: <FlameIcon />, text: 'Hot' },
  [BadgeType.ENERGY_BOOST]: { icon: <BoltIcon />, text: 'Energy Boost' },
  [BadgeType.PROTEIN]: { icon: <DumbbellIcon />, text: 'Protein' },
};

const Badge: React.FC<{ type: BadgeType }> = ({ type }) => {
  const badgeInfo = badgeMap[type];

  // Fallback for any unmapped badges, using the original style
  if (!badgeInfo) {
    return (
      <span className="text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent/90 px-2 py-1 rounded-full">
        {type}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5 bg-surface/80 backdrop-blur-sm shadow text-primary/80 px-2.5 py-1 rounded-full">
      {badgeInfo.icon}
      <span className="text-xs font-semibold uppercase tracking-wider">{badgeInfo.text}</span>
    </div>
  );
};

export default Badge;
