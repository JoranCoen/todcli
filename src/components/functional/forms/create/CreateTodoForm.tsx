import React from 'react';
import type { CreateTodo, TodoStatus } from '@/types';
import { todoStatus } from '@/constants';
import { type FormProps, type AbstractFormField , Form, } from 'ink-form';

export interface FormFieldSelectEnum<T> extends AbstractFormField<'select', T> {
  options: { label: string; value: T }[];
}

const form: FormProps = {
  form: {
    title: 'Create Project',
    sections: [
      {
        title: 'Name & Description',
        fields: [
          { type: 'string', name: 'name', label: 'Name' },
          { type: 'string', name: 'description', label: 'Description', required: false },
          { type: 'select', name: 'status', label: 'Status', options: todoStatus } as FormFieldSelectEnum<TodoStatus>,
        ],
      },
    ],
  },
};

type CreateTodoFormProps = {
  onSubmit: (data: CreateTodo) => void;
};

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onSubmit }) => {
  return (
      <Form
        {...form}
        onSubmit={(result) => {
          onSubmit(result as CreateTodo);
        }}
      />
  );
}

export default CreateTodoForm;
