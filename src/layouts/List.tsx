import React, { useState } from 'react';
import { Box } from 'ink';
import { SideBar } from '@/components/functional/layouts';
import { ContentPane } from '@/components/ui';
import { GradientMap } from '@/constants';
import { readProjects } from '@/lib';
import type { Project, Item, NavItem, View } from '@/types';

type ListLayoutProps = {
  onSelectProject: (project: Project | null) => void;
};

const ListLayout: React.FC<ListLayoutProps> = ({ onSelectProject }) => {
  const projects = readProjects();

  const navItems: NavItem[] = [
    { label: 'Home', gradient: GradientMap.Pastel, content: 'Home', value: 'home', project: null },
    ...projects.map((project) => ({
      label: project.name,
      gradient: GradientMap.Retro,
      content: `Content for ${project.name}`,
      value: project.id.toString(),
      project,
    })),
  ];

  const [activeNavItem, setActiveNavItem] = useState<NavItem>(navItems[0]);

  const handleSelect = (item: Item) => {
    const selected = navItems.find((nav) => nav.value === item.value);
    if (!selected) return;

    setActiveNavItem(selected);
    onSelectProject(selected.project);
  };

  const sidebarItems: Item[] = navItems.map(({ label, value }) => ({ label, value }));

  const currentView: View = activeNavItem.project
    ? { type: 'project', project: activeNavItem.project }
    : { type: 'home' };

  return (
    <Box width="100%" height="100%" flexDirection="row" gap={4}>
      <SideBar navItems={sidebarItems} onSelect={handleSelect} />
      <ContentPane view={currentView} />
    </Box>
  );
};

export default ListLayout;
