import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createTheme() {
  const initial: Theme = browser
    ? (localStorage.getItem('theme') as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'light')
    : 'light';

  const { subscribe, set, update } = writable<Theme>(initial);

  if (browser && initial === 'dark') {
    document.documentElement.classList.add('dark');
  }

  return {
    subscribe,
    toggle: () => update(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      if (browser) {
        localStorage.setItem('theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
      return next;
    }),
    set: (t: Theme) => {
      if (browser) {
        localStorage.setItem('theme', t);
        document.documentElement.classList.toggle('dark', t === 'dark');
      }
      set(t);
    }
  };
}

export const theme = createTheme();
