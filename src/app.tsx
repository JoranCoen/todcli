import React, { useState } from 'react';
import { useInput } from 'ink';
import { MainLayout, FormLayout, ListLayout, IssueLayout } from '@/layouts';
import { CreateProjectForm, CreateTodoForm } from '@/components/functional/forms';
import { writeData, readProjects } from '@/lib';
import { IssueType } from '@/types/issue';
import type { CreateProject, CreateTodo, Project, View } from '@/types';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
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
      setSelectedProjectId(null);
      setView({ type: 'home' });
    }

    if (key.ctrl && input === 'a') {
      setView({ type: 'createProject' });
    }

    if (key.ctrl && input === 't') {
      if (!selectedProject) {
        setView({
          type: 'issue',
          issue: {
            label: 'Error',
            content: 'No project selected',
            type: IssueType.Error,
          },
        });
        return;
      }

      setView({ type: 'createTodo', project: selectedProject });
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
    setView({ type: 'project', project: result.project });
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
    setView({ type: 'project', project: result.project });
  };

  return (
    <MainLayout>
      {view.type === 'issue' && <IssueLayout issue={view.issue} />}

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
