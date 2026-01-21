export const isActivityEnabled = () =>
    window.__REACTEDGE_DEBUG__ === true ||
    new URLSearchParams(window.location.search).has('re-debug');
