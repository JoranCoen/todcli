import { ContentPane, SideBar } from '@/components/functional/layouts';
import type { Item, Project, View } from '@/types';
import { ViewType } from '@/types/view';
import { Box } from 'ink';
import React from 'react';

type Props = {
  projects: Project[];
  selectedProjectId: number | null;
  onSelectProject: (item: Item) => void;
  onSelectTodo: (item: Item) => void;
};

const ListLayout: React.FC<Props> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onSelectTodo,
}) => {
  const navItems = [
    { label: 'Home', value: 'home' },
    ...projects.map((project: Project) => ({
      label: project.name,
      value: String(project.id),
    })),
  ];

  const currentView: View =
    selectedProjectId != null
      ? {
          type: ViewType.Project,
          project: projects.find((p) => p.id === selectedProjectId)!,
        }
      : { type: ViewType.Home };

  return (
    <Box width="100%" height="100%" flexDirection="row" gap={2}>
      {currentView.type === ViewType.Home ? (
        <SideBar navItems={navItems} onSelect={onSelectProject} />
      ) : null}
      <ContentPane view={currentView} onSelect={onSelectTodo} />
    </Box>
  );
};

export default ListLayout;
