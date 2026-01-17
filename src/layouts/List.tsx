import React, { useState } from 'react';
import { Box } from 'ink';
import { SideBar } from '@/components/functional/layouts';
import { ContentPane } from '@/components/ui';
import { NavGradient } from '@/types/nav';
import { readData } from '@/lib';
import type { Project, Item, NavItem } from '@/types';

type ListLayoutProps = {
  onSelectProject: (project: Project | null) => void;
};

const ListLayout: React.FC<ListLayoutProps> = ({ onSelectProject }) => {
  const projects = readData<Project>();

  const navItems: NavItem[] = [
    { label: 'Home', gradient: NavGradient.Pastel, content: 'Home', value: 'home', project: null },
    ...projects.map((p) => ({
      label: p.name,
      gradient: NavGradient.Retro,
      content: `Content for ${p.name}`,
      value: p.id.toString(),
      project: p,
    })),
  ];

  const [activeNav, setActiveNav] = useState<NavItem>(navItems[0]);

  const handleSelect = (item: Item) => {
    const selected = navItems.find((nav) => nav.value === item.value);
    if (!selected) return;

    setActiveNav(selected);
    onSelectProject(selected.project);
  };

  const sidebarItems: Item[] = navItems.map(({ label, value }) => ({ label, value }));

  return (
    <Box width="100%" height="100%" flexDirection="row" gap={4}>
      <SideBar navItems={sidebarItems} onSelect={handleSelect} />
      <ContentPane
        view={
          activeNav.project ? { type: 'project', project: activeNav.project } : { type: 'home' }
        }
      />
    </Box>
  );
};

export default ListLayout;
