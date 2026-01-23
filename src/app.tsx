import { CreateProjectForm, CreateTodoForm, UpdateTodoForm } from '@/components/functional/forms';
import { ConfirmationLayout, FormLayout, IssueLayout, ListLayout, MainLayout } from '@/layouts';
import { readProjects, writeData } from '@/lib';
import type { CreateProject, CreateTodo, Item, Project, UpdateTodo, View } from '@/types';
import { IssueType } from '@/types/issue';
import { ConfirmationType, ViewType } from '@/types/view';
import { Text, useApp, useInput } from 'ink';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const app = useApp();
  const [view, setView] = useState<View>({ type: ViewType.Home });
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;
  const selectedTodo = selectedProject?.todos.find((t) => t.id === selectedTodoId) ?? null;

  const getProjects = (): Project[] => {
    const result = readProjects();
    if (!result.ok) {
      setView(result.view);
      return [];
    }
    return result.data;
  };

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  useEffect(() => {
    if (selectedProject && selectedProject.todos.length > 0) {
      if (!selectedProject.todos.some((t) => t.id === selectedTodoId)) {
        setSelectedTodoId(selectedProject.todos[0].id);
      }
    } else {
      setSelectedTodoId(null);
    }
  }, [selectedProjectId, projects]);

  useInput((input, key) => {
    if (key.escape) {
      if (
        view.type === ViewType.Issue ||
        view.type === ViewType.Confirmation ||
        view.type === ViewType.CreateProject
      ) {
        setView({ type: ViewType.Home });
        return;
      }

      if (view.type === ViewType.Project) {
        setSelectedProjectId(null);
        setView({ type: ViewType.Home });
        return;
      }

      if (selectedProject && view.type === ViewType.UpdateTodo) {
        setView({ type: ViewType.Project, project: selectedProject });
        return;
      }
    }

    if (key.ctrl && input === 'q') {
      app.exit();
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
        target: ConfirmationType.Project,
      });
    }

    if (key.ctrl && input === 'f') {
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
      setView({
        type: ViewType.Confirmation,
        message: `Are you sure you want to delete todo "${selectedTodo.title}"?`,
        target: ConfirmationType.Todo,
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
    setSelectedTodoId(result.project.todos[0]?.id ?? null);
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
    setSelectedTodoId(result.project.todos[0]?.id ?? null);
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
    setSelectedTodoId(result.project.todos[0]?.id ?? null);
    setView({ type: ViewType.Project, project: result.project });
  };

  const handleProjectSelect = (item: Item) => {
    if (item.value === ViewType.Home) {
      setSelectedProjectId(null);
      setView({ type: ViewType.Home });
      return;
    }
    const projectId = Number(item.value);
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    setSelectedProjectId(projectId);
    setView({ type: ViewType.Project, project });
  };

  const handleTodoSelect = (item: Item) => {
    if (item.value === ViewType.Home) {
      setSelectedTodoId(null);
      setView({ type: ViewType.Home });
      return;
    }
    if (!selectedProject) return;
    const todoId = Number(item.value);
    const todo = selectedProject.todos.find((t) => t.id === todoId);
    if (!todo) return;

    setSelectedTodoId(todoId);
    setView({ type: ViewType.UpdateTodo, todo });
  };

  const handleTodoHighlight = (item: Item) => {
    if (item.value === ViewType.Home) {
      setSelectedTodoId(null);
      return;
    }
    setSelectedTodoId(Number(item.value));
  };

  const handleConfirmation = (confirmed: boolean, target: ConfirmationType) => {
    if (!confirmed) {
      if (selectedProject) setView({ type: ViewType.Project, project: selectedProject });
      return;
    }

    if (target === ConfirmationType.Todo) {
      if (!selectedProject || !selectedTodo) return;
      const result = writeData.deleteTodo(selectedProject.id, selectedTodo.id);
      if (!result.ok) {
        setView(result.view);
        return;
      }
      setProjects(getProjects());
      setSelectedTodoId(null);
      setView({ type: ViewType.Project, project: result.project });
      return;
    }

    if (target === ConfirmationType.Project) {
      if (!selectedProject) return;
      const result = writeData.deleteProject(selectedProject.id);
      if (!result.ok) {
        setView(result.view);
        return;
      }
      setProjects(getProjects());
      setSelectedProjectId(null);
      setSelectedTodoId(null);
      setView({ type: ViewType.Home });
      return;
    }
  };

  return (
    <MainLayout>
      <Text>{view.type}</Text>

      {view.type === ViewType.Issue && <IssueLayout issue={view.issue} />}

      {view.type === ViewType.Confirmation && view.target === 'project' && selectedProject && (
        <ConfirmationLayout
          message={`Are you sure you want to delete project "${selectedProject.name}"?`}
          setConfirmation={handleConfirmation}
          target={view.target}
        />
      )}

      {view.type === ViewType.Confirmation &&
        view.target === 'todo' &&
        selectedProject &&
        selectedTodo && (
          <ConfirmationLayout
            message={`Are you sure you want to delete todo "${selectedTodo.title}"?`}
            setConfirmation={handleConfirmation}
            target={view.target}
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
          view={view}
          projects={projects}
          onSelectProject={handleProjectSelect}
          onSelectTodo={handleTodoSelect}
          onHighlightTodo={handleTodoHighlight}
        />
      )}
    </MainLayout>
  );
};

export default App;
