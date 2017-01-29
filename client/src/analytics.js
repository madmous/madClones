import ReactGA from 'react-ga'

ReactGA.initialize('UA-91097110-1');

export default function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}