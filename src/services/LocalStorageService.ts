import { name } from '../../package.json';

export function save(key: string, value: string): void {
  localStorage.setItem(`${name}:${key}`, value);
}

export function load(key: string): string | null {
  return localStorage.getItem(`${name}:${key}`);
}
