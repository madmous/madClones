import ReactGA from 'react-ga'

ReactGA.initialize('UA-92655720-1');

export default function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}