import { ContentPane, SideBar } from '@/components/functional/layouts';
import type { Item, Project, View } from '@/types';
import { ViewType } from '@/types/view';
import { Box } from 'ink';
import React from 'react';

type Props = {
  view: View;
  projects: Project[];
  onSelectProject: (item: Item) => void;
  onSelectTodo: (item: Item) => void;
  onHighlightTodo: (item: Item) => void;
};

const ListLayout: React.FC<Props> = ({
  view,
  projects,
  onSelectProject,
  onSelectTodo,
  onHighlightTodo,
}) => {
  const navItems = [
    { label: 'Home', value: 'home' },
    ...projects.map((project: Project) => ({
      label: project.name,
      value: String(project.id),
    })),
  ];


  return (
    <Box width="100%" height="100%" flexDirection="row" gap={2}>
      {view.type === ViewType.Home ? (
        <SideBar navItems={navItems} onSelect={onSelectProject} />
      ) : null}
      <ContentPane view={view} onSelect={onSelectTodo} onHighlight={onHighlightTodo} />
    </Box>
  );
};

export default ListLayout;
