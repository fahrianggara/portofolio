// toastService.js
import { reactive } from 'vue';

const toasts = reactive([]);
let toastId = 0;

export const useToast = () => {
  const createToast = (type, message, options = {}) => {
    const id = toastId++;
    const toast = {
      id,
      type,
      message,
      duration: options.duration || 5000,
      autoClose: options.autoClose !== undefined ? options.autoClose : true
    };

    toasts.push(toast);

    if (toast.autoClose) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
    }
  };

  return {
    toasts,
    success: (message, options) => createToast('success', message, options),
    info: (message, options) => createToast('info', message, options),
    warning: (message, options) => createToast('warning', message, options),
    error: (message, options) => createToast('error', message, options),
    remove: removeToast
  };
};