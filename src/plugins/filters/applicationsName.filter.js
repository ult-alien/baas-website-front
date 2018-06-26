import store from './../../core/store';
export default function (appId) {
  let arr = store.state.contextData.applications;
  let applicationsName = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].appId === appId) {
      applicationsName = arr[i].appName;
      break;
    }
  }
  return applicationsName;
};
