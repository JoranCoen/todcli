import React from 'react';
import { TodoStatus } from '@/types/todo';
import type { CreateTodo } from '@/types';
import { type FormProps, Form } from 'ink-form';

const Options = [
  { label: 'Pending', value: TodoStatus.Pending },
  { label: 'In Progress', value: TodoStatus.InProgress },
  { label: 'Completed', value: TodoStatus.Completed },
];

const form: FormProps = {
  form: {
    title: 'Create Todo',
    sections: [
      {
        title: 'Name & Description',
        fields: [
          { type: 'string', name: 'title', label: 'Title' },
          { type: 'string', name: 'description', label: 'Description', required: false },
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            options: Options,
            initialValue: TodoStatus.Pending,
          },
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
