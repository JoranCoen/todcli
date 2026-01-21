import { SideBar, ContentPane } from '@/components/functional/layouts';
import type { Item, Project, View } from '@/types';
import { ViewType } from '@/types/view';
import { Box } from 'ink';
import React from 'react';

type Props = {
  projects: Project[];
  selectedProjectId: number | null;
  onSelectProjectId: (id: number | null) => void;
  onSelectTodo: (id: number | null) => void;
};

const ListLayout: React.FC<Props> = ({
  projects,
  selectedProjectId,
  onSelectProjectId,
  onSelectTodo,
}) => {
  const navItems = [
    { label: 'Home', value: 'home' },
    ...projects.map((p) => ({
      label: p.name,
      value: String(p.id),
    })),
  ];

  const handleTodoSelect = (todoId: number) => {
    onSelectTodo(todoId);
  };

  const handleProjectSelect = (item: Item) => {
    if (item.value === ViewType.Home) {
      onSelectProjectId(null);
    } else {
      onSelectProjectId(Number(item.value));
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
      {currentView.type === ViewType.Home ? (
        <SideBar navItems={navItems} initialIndex={selectedIndex} onSelect={handleProjectSelect} />
      ) : null}
      <ContentPane view={currentView} onSelect={handleTodoSelect} />
    </Box>
  );
};

export default ListLayout;
