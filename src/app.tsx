import React, { useState } from 'react';
import { useInput } from 'ink';
import { writeData } from '@/lib';
import { TodoStatus } from '@/types/todo';
import { IssueType } from '@/types/issue';
import { MainLayout, FormLayout, ListLayout, IssueLayout } from '@/layouts';
import { CreateProjectForm, CreateTodoForm } from '@/components/functional/forms';
import type { CreateProject, CreateTodo, Project, View } from '@/types';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useInput((input, key) => {
    if (key.escape) {
      setSelectedProject(null);
      setView({ type: 'home' });
      return;
    }

    switch (input) {
      case 'A':
        setView({ type: 'createProject' });
        break;
      case 'Q':
        setSelectedProject(null);
        setView({ type: 'home' });
        break;
      case 'a':
        if (!selectedProject) {
          setView({
            type: 'issue',
            issue: {
              label: 'Error',
              content: 'No project selected for the todo',
              type: IssueType.Error,
            },
          });
          break;
        }

        setView({ type: 'createTodo', project: selectedProject });
        break;
      case 'q':
        setView({ type: 'home' });
        break;
    }
  });

  const handleProjectSubmit = (data: CreateProject) => {
    writeData({ type: 'project', project: { name: data.name, description: data.description } });
    setSelectedProject(null);
    setView({ type: 'home' });
  };

  const handleTodoSubmit = (data: CreateTodo) => {
    if (!selectedProject) {
      setView({
        type: 'issue',
        issue: {
          label: 'Error',
          content: 'No project selected for the todo',
          type: IssueType.Error,
        },
      });
      return;
    }
    writeData({
      type: 'todo',
      projectId: selectedProject.id,
      todo: { title: data.title, description: data.description ?? '', status: TodoStatus.Pending },
    });
    setView({ type: 'project', project: selectedProject });
  };

  return (
    <MainLayout>
      {view.type === 'issue' && <IssueLayout issue={view.issue} />}

      {view.type === 'createProject' && (
        <FormLayout<CreateProject>
          setShowFormLayout={() => setView({ type: 'home' })}
          FormComponent={CreateProjectForm}
          onSubmit={handleProjectSubmit}
        />
      )}

      {view.type === 'createTodo' && selectedProject && (
        <FormLayout<CreateTodo>
          setShowFormLayout={() => setView({ type: 'home' })}
          FormComponent={CreateTodoForm}
          onSubmit={handleTodoSubmit}
        />
      )}

      {(view.type === 'home' || view.type === 'project') && (
        <ListLayout
          onSelectProject={(project) => {
            setSelectedProject(project);
            setView(project ? { type: 'project', project } : { type: 'home' });
          }}
        />
      )}
    </MainLayout>
  );
};

export default App;
