import { storage } from './storage';

export interface Section {
  id: string;
  title: string;
  required: boolean;
}

export interface Module {
  sections: Section[];
}

const PROGRESS_KEY = 'cwail-progress';
const MODULE_KEY = 'cwail-module';

export async function loadModule(): Promise<Module> {
  try {
    const response = await fetch('/src/content/module.json');
    const module = await response.json();
    storage.set(MODULE_KEY, module);
    return module;
  } catch (error) {
    console.error('Failed to load module:', error);
    return storage.get<Module>(MODULE_KEY, { sections: [] });
  }
}

export function getCompleted(): string[] {
  return storage.get<string[]>(PROGRESS_KEY, []);
}

export function markCompleted(id: string): void {
  const completed = getCompleted();
  if (!completed.includes(id)) {
    completed.push(id);
    storage.set(PROGRESS_KEY, completed);
  }
}

export function isCompleted(id: string): boolean {
  return getCompleted().includes(id);
}

export function allRequiredCompleted(): boolean {
  const module = storage.get<Module>(MODULE_KEY, { sections: [] });
  const completed = getCompleted();
  const requiredSections = module.sections.filter(s => s.required);
  return requiredSections.every(s => completed.includes(s.id));
}

export function nextSectionId(currentId: string): string | null {
  const module = storage.get<Module>(MODULE_KEY, { sections: [] });
  const currentIndex = module.sections.findIndex(s => s.id === currentId);
  if (currentIndex === -1 || currentIndex === module.sections.length - 1) {
    return null;
  }
  return module.sections[currentIndex + 1].id;
}

export function prevSectionId(currentId: string): string | null {
  const module = storage.get<Module>(MODULE_KEY, { sections: [] });
  const currentIndex = module.sections.findIndex(s => s.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return module.sections[currentIndex - 1].id;
}

export function getProgressPercentage(): number {
  const module = storage.get<Module>(MODULE_KEY, { sections: [] });
  const completed = getCompleted();
  const requiredSections = module.sections.filter(s => s.required);
  const completedRequired = requiredSections.filter(s => completed.includes(s.id));
  
  if (requiredSections.length === 0) return 0;
  return Math.round((completedRequired.length / requiredSections.length) * 100);
}
