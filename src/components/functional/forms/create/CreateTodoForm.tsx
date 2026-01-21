import type { CreateTodo } from '@/types';
import { TodoStatus } from '@/types/todo';
import { type FormProps, Form } from 'ink-form';
import React from 'react';

const form: FormProps = {
  form: {
    title: 'Create Todo',
    sections: [
      {
        title: 'Name & Description',
        fields: [
          { type: 'string', name: 'title', label: 'Title' },
          { type: 'string', name: 'description', label: 'Description' },
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            options: [
              { label: 'Pending', value: TodoStatus.Pending },
              { label: 'In Progress', value: TodoStatus.InProgress },
              { label: 'Completed', value: TodoStatus.Completed },
            ],
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
