import React, { useState } from 'react';
import { useInput } from 'ink';
import { MainLayout, FormLayout, ListLayout } from '@/layouts';
import { CreateProjectForm, CreateTodoForm } from '@/components/functional/forms';
import { writeData } from '@/lib';
import { TodoStatus } from '@/types/todo';
import type { CreateProject, CreateTodo, Project } from '@/types';
import type { View } from '@/types/view';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useInput((input, key) => {
    if (key.escape) {
      setView({ type: 'home' });
      return;
    }

    switch (input) {
      case 'A':
        setView({ type: 'createProject' });
        break;
      case 'Q':
        setView({ type: 'home' });
        break;
      case 'a':
        if (selectedProject) {
          setView({ type: 'createTodo', project: selectedProject });
        }
        break;
      case 'q':
        setView({ type: 'home' });
        break;
    }
  });

  const handleProjectSubmit = (data: CreateProject) => {
    writeData({ type: 'project', project: { name: data.name, description: data.description } });
    setView({ type: 'home' });
  };

  const handleTodoSubmit = (data: CreateTodo) => {
    if (!selectedProject) {
      console.warn('No project selected for the todo');
      setView({ type: 'home' });
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
