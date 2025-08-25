import { storage } from './storage';

export interface Section {
  id: string;
  title: string;
  required: boolean;
}

export interface Module {
  sections: Section[];
}

const PROGRESS_KEY = 'cwail.completed';
const MODULE_KEY = 'cwail-module';

let moduleCache: Module | null = null;

export async function loadModule(): Promise<Module> {
  if (moduleCache) {
    return moduleCache;
  }

  try {
    const response = await fetch('/src/content/module.json');
    const module = await response.json();
    moduleCache = module;
    storage.set(MODULE_KEY, module);
    return module;
  } catch (error) {
    console.error('Failed to load module:', error);
    const cached = storage.get<Module>(MODULE_KEY, { sections: [] });
    moduleCache = cached;
    return cached;
  }
}

export function getModule(): Module {
  if (!moduleCache) {
    // Fallback to cached version if not loaded yet
    return storage.get<Module>(MODULE_KEY, { sections: [] });
  }
  return moduleCache;
}

export function getAllSectionIds(): string[] {
  const module = getModule();
  return module.sections.map(s => s.id);
}

export function getRequiredSectionIds(): string[] {
  const module = getModule();
  return module.sections.filter(s => s.required).map(s => s.id);
}

export function getCompleted(): string[] {
  return storage.get<string[]>(PROGRESS_KEY, []);
}

export function isCompleted(id: string): boolean {
  return getCompleted().includes(id);
}

export function setCompleted(id: string, value: boolean): void {
  const completed = getCompleted();
  
  if (value && !completed.includes(id)) {
    completed.push(id);
  } else if (!value && completed.includes(id)) {
    const index = completed.indexOf(id);
    if (index > -1) {
      completed.splice(index, 1);
    }
  }
  
  storage.set(PROGRESS_KEY, completed);
}

export function markCompleted(id: string): void {
  setCompleted(id, true);
}

export function unmarkCompleted(id: string): void {
  setCompleted(id, false);
}

export function completedCount(): number {
  return getCompleted().length;
}

export function completedRequiredCount(): number {
  const completed = getCompleted();
  const requiredIds = getRequiredSectionIds();
  return requiredIds.filter(id => completed.includes(id)).length;
}

export function allRequiredCompleted(): boolean {
  const requiredIds = getRequiredSectionIds();
  const completed = getCompleted();
  return requiredIds.every(id => completed.includes(id));
}

export function canAccessConclusion(): boolean {
  return allRequiredCompleted();
}

export function canAccessPartingMessage(): boolean {
  return allRequiredCompleted();
}

export function canAccessQuiz(): boolean {
  return allRequiredCompleted() && isCompleted('conclusion') && isCompleted('parting-message');
}

export function nextSectionId(currentId: string): string | null {
  const module = getModule();
  const currentIndex = module.sections.findIndex(s => s.id === currentId);
  if (currentIndex === -1 || currentIndex === module.sections.length - 1) {
    return null;
  }
  return module.sections[currentIndex + 1].id;
}

export function prevSectionId(currentId: string): string | null {
  const module = getModule();
  const currentIndex = module.sections.findIndex(s => s.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return module.sections[currentIndex - 1].id;
}

export function firstIncompleteRequired(): string | null {
  const requiredIds = getRequiredSectionIds();
  const completed = getCompleted();
  
  for (const id of requiredIds) {
    if (!completed.includes(id)) {
      return id;
    }
  }
  
  return null;
}

export function getProgressPercentage(): number {
  const requiredIds = getRequiredSectionIds();
  if (requiredIds.length === 0) return 0;
  
  const completedRequired = completedRequiredCount();
  return Math.round((completedRequired / requiredIds.length) * 100);
}
