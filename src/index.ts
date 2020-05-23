//import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

/**
 * NOTE(keanulee): Ideally we would just `import '@babel/polyfill'` and rely
 * on babel-preset-env's useBuiltIns
 * (https://babeljs.io/docs/en/babel-preset-env#usebuiltins) to detect language
 * features, but webcomponents-sd-ce-pf.js already imports some language
 * features, such as Symbol, which conflicts with '@babel/polyfill'. So
 * instead, we just import the features we know we need.
 */
//import 'regenerator-runtime/runtime';

// To force all event listeners for gestures to be passive.
// See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
//setPassiveTouchGestures(true);

import './app/views/loading/loading';
import './styles/styles.scss';
