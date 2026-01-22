import { CreateProjectForm, CreateTodoForm, UpdateTodoForm } from '@/components/functional/forms';
import { ConfirmationLayout, FormLayout, IssueLayout, ListLayout, MainLayout } from '@/layouts';
import { readProjects, writeData } from '@/lib';
import type { CreateProject, CreateTodo, Item, Project, UpdateTodo, View } from '@/types';
import { IssueType } from '@/types/issue';
import { ViewType } from '@/types/view';
import { useApp, useInput } from 'ink';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: ViewType.Home });
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const getProjects = (): Project[] => {
    const result = readProjects();

    if (!result.ok) {
      setView(result.view);
      return [];
    }

    return result.data;
  };

  const [projects, setProjects] = useState<Project[]>(getProjects());
  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;
  const selectedTodo = selectedProject?.todos.find((t) => t.id === selectedTodoId) ?? null;

  useInput((input, key) => {
    if (key.ctrl && input === 'q') {
      useApp().exit();
    }

    if (key.ctrl && input === 'h') {
      if (selectedProject) {
        setSelectedProjectId(null);
        setView({ type: ViewType.Project, project: selectedProject });
        return;
      }
    }

    if (key.escape) {
      if (selectedProject) {
        setView({ type: ViewType.Project, project: selectedProject });
        return;
      }
      setSelectedProjectId(null);
      setView({ type: ViewType.Home });
    }

    if (key.ctrl && input === 'a') {
      setView({ type: ViewType.CreateProject });
    }

    if (key.ctrl && input === 't') {
      if (!selectedProject) {
        setView({
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: 'No project selected',
            type: IssueType.Error,
          },
        });
        return;
      }

      setView({ type: ViewType.CreateTodo, project: selectedProject });
    }

    if (key.ctrl && input === 's') {
      if (!selectedTodo) {
        setView({
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: 'No todo selected',
            type: IssueType.Error,
          },
        });
        return;
      }

      setView({ type: ViewType.UpdateTodo, todo: selectedTodo });
    }

    if (key.ctrl && input === 'd') {
      if (!selectedProject) {
        setView({
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: 'No project selected',
            type: IssueType.Error,
          },
        });
        return;
      }

      setView({
        type: ViewType.Confirmation,
        message: `Are you sure you want to delete project "${selectedProject.name}"?`,
      });
    }
  });

  const handleCreateProject = (data: CreateProject) => {
    const result = writeData.createProject(data);

    if (!result.ok) {
      setView(result.view);
      return;
    }

    setProjects((prev) => [...prev, result.project]);
    setSelectedProjectId(result.project.id);
    setView({ type: ViewType.Project, project: result.project });
  };

  const handleCreateTodo = (data: CreateTodo) => {
    if (!selectedProject) return;

    const result = writeData.createTodo(selectedProject.id, data);

    if (!result.ok) {
      setView(result.view);
      return;
    }

    setProjects(getProjects());
    setSelectedProjectId(result.project.id);
    setView({ type: ViewType.Project, project: result.project });
  };

  const handleUpdateTodo = (data: UpdateTodo) => {
    if (!selectedProject) return;

    const result = writeData.updateTodo(selectedProject.id, data);

    if (!result.ok) {
      setView(result.view);
      return;
    }

    setProjects(getProjects());
    setSelectedProjectId(result.project.id);
    setView({ type: ViewType.Project, project: result.project });
  };

  const handleTodoSelect = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const handleProjectSelect = (item: Item) => {
    if (item.value === ViewType.Home) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(Number(item.value));
    }
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (!selectedProject) return;

    if (confirmed) {
      const result = writeData.deleteProject(selectedProject.id);
      if (!result.ok) {
        setView(result.view);
        return;
      }

      setProjects(getProjects());
      setSelectedProjectId(null);
      setView({ type: ViewType.Home });
    } else {
      setView({ type: ViewType.Project, project: selectedProject });
    }
    setView({ type: ViewType.Project, project: selectedProject });
  };

  return (
    <MainLayout>
      {view.type === ViewType.Issue && <IssueLayout issue={view.issue} />}

      {view.type === ViewType.Confirmation && selectedProject && (
        <ConfirmationLayout
          message={`Are you sure you want to delete project "${selectedProject.name}"?`}
          setConfirmation={handleConfirmation}
        />
      )}

      {view.type === ViewType.CreateProject && (
        <FormLayout
          FormComponent={CreateProjectForm}
          onSubmit={handleCreateProject}
          setView={setView}
        />
      )}

      {view.type === ViewType.CreateTodo && selectedProject && (
        <FormLayout FormComponent={CreateTodoForm} onSubmit={handleCreateTodo} setView={setView} />
      )}

      {view.type === ViewType.UpdateTodo && selectedProject && selectedTodo && (
        <FormLayout
          FormComponent={UpdateTodoForm}
          formProps={{ todo: selectedTodo }}
          onSubmit={handleUpdateTodo}
          setView={setView}
        />
      )}

      {(view.type === ViewType.Home || view.type === ViewType.Project) && (
        <ListLayout
          projects={projects}
          selectedProject={selectedProjectId}
          onSelectProject={handleProjectSelect}
          onSelectTodo={handleTodoSelect}
        />
      )}
    </MainLayout>
  );
};

export default App;
