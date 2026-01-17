import React from 'react';
import type {  CreateProject, } from '@/types';
import { type FormProps, Form } from 'ink-form';

const form: FormProps = {
  form: {
    title: 'Create Project',
    sections: [
      {
        title: 'Name & Description',
        fields: [
          { type: 'string', name: 'name', label: 'Name' },
          { type: 'string', name: 'description', label: 'Description', required: false },
        ],
      },
    ],
  },
};

type CreateProjectFormProps = {
  onSubmit: (data: CreateProject) => void;
};

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSubmit }) => {
  return (
      <Form
        {...form}
        onSubmit={(result) => {
          onSubmit(result as CreateProject);
        }}
      />
  );
}

export default CreateProjectForm;
