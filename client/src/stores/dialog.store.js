import { create } from "zustand";

// helper
const generateDialogKey = (key, contextId) => `${key}:${contextId}`;

export const useDialogStore = create((set, get) => ({
  openDialogs: {},

  open: (key, contextId) => {
    const dialogKey = generateDialogKey(key, contextId);

    set((state) => ({
      openDialogs: {
        ...state.openDialogs,
        [dialogKey]: true,
      },
    }));
  },

  close: (key, contextId) => {
    if (key && contextId) {
      const dialogKey = generateDialogKey(key, contextId);

      set((state) => {
        const updated = { ...state.openDialogs };
        delete updated[dialogKey];
        return { openDialogs: updated };
      });
    } else {
      // close all dialogs
      set({ openDialogs: {} });
    }
  },

  isOpen: (key, contextId) => {
    const dialogKey = generateDialogKey(key, contextId);
    return !!get().openDialogs[dialogKey];
  },

  isAnyOpen: () => Object.keys(get().openDialogs).length > 0,
}));
