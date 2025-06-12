import { toast } from 'vue3-toastify'

/**
 * Displays a toast notification with specified options.
 *
 * @param {string} message - The message to be displayed in the toast notification. It can contain HTML.
 * @param {'success'|'error'|'info'|'warning'} type - The type of the toast notification. Defaults to 'default'.
 * @param {number} time - The duration (in milliseconds) for which the toast should be visible.
 * @param {'top-left'|'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right'} position - The position of the toast notification on the screen. Defaults to 'top-right'.
 * @param {'auto'|'light'|'dark'|'colored'} theme - The theme of the toast notification. Defaults to 'auto'.
 * @param {boolean} bar - Determines if the progress bar should be visible. Defaults to false.
 *
 * @example
 * showMessage('This is a success message', 'success', 3000, 'top-right', 'light', true);
 */
function showMessage (message, type, time, position, theme, bar) {
  toast(message, {
    theme: theme || 'auto',
    type: type || 'default',
    position: position || 'top-right',
    pauseOnFocusLoss: false,
    autoClose: time,
    hideProgressBar: bar || false,
    dangerouslyHTMLString: true,
  })
}

export { showMessage }
