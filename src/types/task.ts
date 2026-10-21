type Task = {
  id: number;
  title: string;
  description: string;
  status: 'To do' | 'In progress' | 'Done';
};

export default Task;
