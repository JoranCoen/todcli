import type { Todo, UpdateTodo } from '@/types';
import { TodoStatus } from '@/types/todo';
import { type FormProps, Form } from 'ink-form';
import React from 'react';

type UpdateTodoFormProps = {
  todo: Todo;
  onSubmit: (data: UpdateTodo) => void;
};

const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ todo, onSubmit }) => {
  const form: FormProps = {
    form: {
      title: 'Update Todo',
      sections: [
        {
          title: 'Name & Description',
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Title',
              initialValue: todo.title,
            },
            {
              type: 'string',
              name: 'description',
              label: 'Description',
              initialValue: todo.description,
              required: false,
            },
            {
              type: 'select',
              name: 'status',
              label: 'Status',
              options: [
                { label: 'Pending', value: TodoStatus.Pending },
                { label: 'In Progress', value: TodoStatus.InProgress },
                { label: 'Completed', value: TodoStatus.Completed },
              ],
              initialValue: todo.status,
            },
          ],
        },
      ],
    },
  };

  return (
    <Form
      {...form}
      onSubmit={(result) =>
        onSubmit({
          ...result,
          id: todo.id,
        } as UpdateTodo)
      }
    />
  );
};

export default UpdateTodoForm;
