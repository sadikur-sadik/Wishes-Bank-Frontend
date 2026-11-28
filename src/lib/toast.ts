import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Display a user-facing success notification with emerald branding
 */
export const showSuccess = (message: string, toastId?: string) => {
  if (!message) return;
  return toast.success(message, {
    ...defaultOptions,
    toastId: toastId || message,
  });
};

/**
 * Display a user-facing error notification with meaningful feedback
 */
export const showError = (message: string, toastId?: string) => {
  if (!message) return;
  return toast.error(message, {
    ...defaultOptions,
    toastId: toastId || message,
  });
};

/**
 * Display an informational notification
 */
export const showInfo = (message: string, toastId?: string) => {
  if (!message) return;
  return toast.info(message, {
    ...defaultOptions,
    toastId: toastId || message,
  });
};

/**
 * Display a warning notification
 */
export const showWarning = (message: string, toastId?: string) => {
  if (!message) return;
  return toast.warning(message, {
    ...defaultOptions,
    toastId: toastId || message,
  });
};
