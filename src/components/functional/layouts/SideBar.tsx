import React from 'react';
import { Box } from 'ink';
import SelectInput from 'ink-select-input';
import type { Item } from '@/types';

type SideBarProps = {
  navItems: Item[];
  onSelect: (item: Item) => void;
};

const SideBar: React.FC<SideBarProps> = ({ navItems, onSelect }) => {
  return (
    <Box borderStyle="round" height="100%" width={40}>
      <SelectInput items={navItems} onSelect={onSelect} />
    </Box>
  );
};

export default SideBar;
