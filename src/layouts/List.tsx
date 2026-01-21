import React from 'react';
import { Box } from 'ink';
import { SideBar } from '@/components/functional/layouts';
import { ContentPane } from '@/components/ui';
import { ViewType } from '@/types/view';
import type { Project, View, Item } from '@/types';

type Props = {
  projects: Project[];
  selectedProjectId: number | null;
  onSelectProject: (id: number | null) => void;
};

const ListLayout: React.FC<Props> = ({ projects, selectedProjectId, onSelectProject }) => {
  const navItems = [
    { label: 'Home', value: 'home' },
    ...projects.map((p) => ({
      label: p.name,
      value: String(p.id),
    })),
  ];

  const handleSelect = (item: Item) => {
    if (item.value === ViewType.Home) {
      onSelectProject(null);
    } else {
      onSelectProject(Number(item.value));
    }
  };

  const selectedIndex =
    selectedProjectId != null
      ? navItems.findIndex((i) => i.value === String(selectedProjectId))
      : 0;

  const currentView: View =
    selectedProjectId != null
      ? {
          type: ViewType.Project,
          project: projects.find((p) => p.id === selectedProjectId)!,
        }
      : { type: ViewType.Home };

  return (
    <Box width="100%" height="100%" flexDirection="row" gap={2}>
      <SideBar navItems={navItems} initialIndex={selectedIndex} onSelect={handleSelect} />
      <ContentPane view={currentView} />
    </Box>
  );
};

export default ListLayout;
