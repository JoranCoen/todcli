import React from 'react';
import { Box } from 'ink';
import SelectInput from 'ink-select-input';
import type { Item } from '@/types';

type SideBarProps = {
  navItems: Item[];
  initialIndex: number;
  onSelect: (item: Item) => void;
};

const SideBar: React.FC<SideBarProps> = ({ navItems, initialIndex, onSelect }) => {
  return (
    <Box borderStyle="round" height="100%" width={20}>
      <SelectInput items={navItems} initialIndex={initialIndex} onSelect={onSelect} />
    </Box>
  );
};

export default SideBar;
