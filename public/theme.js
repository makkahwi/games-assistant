// Apply the saved appearance before the stylesheet and app render.
(() => {
  let preference;
  try { preference = localStorage.getItem('app-theme'); } catch { /* Use the system preference when storage is unavailable. */ }
  const theme = preference === 'light' || preference === 'dark'
    ? preference
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#15224b' : '#163fcc');
})();
