import { ContentPane, SideBar } from '@/components/functional/layouts';
import type { Item, Project, View } from '@/types';
import { ViewType } from '@/types/view';
import { Box } from 'ink';
import React from 'react';

type Props = {
  projects: Project[];
  selectedProject: number | null;
  onSelectProject: (item: Item) => void;
  onSelectTodo: (todoId: number) => void;
};

const ListLayout: React.FC<Props> = ({
  projects,
  selectedProject,
  onSelectProject,
  onSelectTodo,
}) => {
  const navItems = [
    { label: 'Home', value: 'home' },
    ...projects.map((p) => ({
      label: p.name,
      value: String(p.id),
    })),
  ];
  

  const selectedIndex =
    selectedProject != null
      ? navItems.findIndex((i) => i.value === String(selectedProject))
      : 0;

  const currentView: View =
    selectedProject != null
      ? {
          type: ViewType.Project,
          project: projects.find((p) => p.id === selectedProject)!,
        }
      : { type: ViewType.Home };

  return (
    <Box width="100%" height="100%" flexDirection="row" gap={2}>
      {currentView.type === ViewType.Home ? (
        <SideBar navItems={navItems} initialIndex={selectedIndex} onSelect={onSelectProject} />
      ) : null}
      <ContentPane view={currentView} onSelect={onSelectTodo} />
    </Box>
  );
};

export default ListLayout;
