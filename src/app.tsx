import React, { useState } from 'react';
import { useInput } from 'ink';
import { MainLayout, FormLayout, ListLayout, IssueLayout, ConfirmationLayout } from '@/layouts';
import { CreateProjectForm, CreateTodoForm } from '@/components/functional/forms';
import { writeData, readProjects } from '@/lib';
import { IssueType } from '@/types/issue';
import { ViewType } from '@/types/view';
import type { CreateProject, CreateTodo, Project, View } from '@/types';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: ViewType.Home });
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

  useInput((input, key) => {
    if (key.escape) {
      if (selectedProject) {
        setView({
          type: 'project',
          project: selectedProject,
        });
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
      {view.type === 'issue' && <IssueLayout issue={view.issue} />}

      {view.type === 'confirmation' && selectedProject && (
        <ConfirmationLayout
          message={`Are you sure you want to delete project "${selectedProject.name}"?`}
          setConfirmation={handleConfirmation}
        />
      )}

      {view.type === 'createProject' && (
        <FormLayout
          FormComponent={CreateProjectForm}
          onSubmit={handleCreateProject}
          setView={setView}
        />
      )}

      {view.type === 'createTodo' && selectedProject && (
        <FormLayout FormComponent={CreateTodoForm} onSubmit={handleCreateTodo} setView={setView} />
      )}

      {(view.type === 'home' || view.type === 'project') && (
        <ListLayout
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
      )}
    </MainLayout>
  );
};

export default App;
