import React from 'react';
import { TodoStatus } from '@/types/todo';
import type { CreateTodo } from '@/types';
import { type FormProps, type AbstractFormField, Form } from 'ink-form';

const todoStatus = [
  { label: 'Pending', value: TodoStatus.Pending },
  { label: 'In Progress', value: TodoStatus.InProgress },
  { label: 'Completed', value: TodoStatus.Completed },
];

interface FormFieldSelectEnum<T> extends AbstractFormField<'select', T> {
  options: { label: string; value: T }[];
}

const form: FormProps = {
  form: {
    title: 'Create Todo',
    sections: [
      {
        title: 'Name & Description',
        fields: [
          { type: 'string', name: 'name', label: 'Name' },
          { type: 'string', name: 'description', label: 'Description', required: false },
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            options: todoStatus,
            initialValue: TodoStatus.Pending,
          } as FormFieldSelectEnum<TodoStatus>,
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
};

export default CreateTodoForm;
