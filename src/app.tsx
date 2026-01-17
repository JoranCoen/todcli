import React, { useState } from 'react';
import { useInput } from 'ink';
import { MainLayout, FormLayout, ListLayout } from '@/layouts';
import { CreateProjectForm, CreateTodoForm } from '@/components/functional/forms';
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

  return (
    <MainLayout>
      {view.type === 'createProject' && (
        <FormLayout<CreateProject>
          setShowFormLayout={() => setView({ type: 'home' })}
          FormComponent={CreateProjectForm}
        />
      )}

      {view.type === 'createTodo' && (
        <FormLayout<CreateTodo>
          setShowFormLayout={() => setView({ type: 'home' })}
          FormComponent={CreateTodoForm}
        />
      )}

      {(view.type === 'home' || view.type === 'project') && (
        <ListLayout
          onSelectProject={(project) => {
            setSelectedProject(project);
            if (project) setView({ type: 'project', project });
            else setView({ type: 'home' });
          }}
        />
      )}
    </MainLayout>
  );
};

export default App;
