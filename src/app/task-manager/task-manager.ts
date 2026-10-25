import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Task from '../../types/task';
import Status from '../../types/status';

interface TaskWithPriority extends Task {
  priority: 'Niski' | 'Średni' | 'Wysoki';
  assignee: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-task-manager',
  styleUrl: './task-manager.css',
  templateUrl: './task-manager.html',
})
export class TaskManager {
  readonly searchTerm = signal('');
  readonly selectedStatus = signal<string>('all');

  readonly tasks = signal<TaskWithPriority[]>([
    {
      id: 1,
      title: 'Skonfigurować globalne menu',
      description: 'Stworzyć spójny pasek nawigacji z routingiem i profilem użytkownika',
      status: 'Done',
      priority: 'Wysoki',
      assignee: 'Jan Kowalski',
    },
    {
      id: 2,
      title: 'Dodać autoryzację i guardy',
      description: 'Zabezpieczyć trasy /board i /tasks przed nieautoryzowanym dostępem',
      status: 'Done',
      priority: 'Wysoki',
      assignee: 'Jan Kowalski',
    },
    {
      id: 3,
      title: 'Optymalizacja przeciągania CDK Drag & Drop',
      description: 'Sprawdzić płynność animacji na urządzeniach dotykowych',
      status: 'In progress',
      priority: 'Średni',
      assignee: 'Anna Nowak',
    },
    {
      id: 4,
      title: 'Integracja z backendowym API',
      description: 'Podmienić mocki zadań na prawdziwe zapytania HTTP',
      status: 'To do',
      priority: 'Wysoki',
      assignee: 'Michał Wiśniewski',
    },
    {
      id: 5,
      title: 'Audyt dostępności WCAG 2.1',
      description: 'Sprawdzić kontrast kolorów i dostępność dla czytników ekranu',
      status: 'To do',
      priority: 'Niski',
      assignee: 'Jan Kowalski',
    },
    {
      id: 6,
      title: 'Przygotować testy E2E',
      description: 'Stworzyć scenariusze testowe dla ścieżki logowania i tablicy',
      status: 'To do',
      priority: 'Średni',
      assignee: 'Anna Nowak',
    },
  ]);

  readonly filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.tasks().filter((task) => {
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.assignee.toLowerCase().includes(term);

      const matchesStatus = status === 'all' || task.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  readonly counts = computed(() => {
    const all = this.tasks();
    return {
      all: all.length,
      todo: all.filter((t) => t.status === 'To do').length,
      inProgress: all.filter((t) => t.status === 'In progress').length,
      done: all.filter((t) => t.status === 'Done').length,
    };
  });

  updateStatus(taskId: number, newStatus: Status): void {
    this.tasks.update((list) =>
      list.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  }
}
