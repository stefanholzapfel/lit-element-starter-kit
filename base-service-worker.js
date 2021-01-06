import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';

self.skipWaiting();
clientsClaim();

//TODO: don't want to have to manually include index.html, should work out of the box (https://github.com/GoogleChrome/workbox/issues/2660)
//TODO: issue only exists with webpack-dev-server on
let array = Array.from(self.__WB_MANIFEST);
array = array.find(entry => entry.url && (entry.url === '/index.html' || entry.url === 'index.html')) ?
    array :
    [
        ...array,
        {
            'revision': '1234',
            'url': '/index.html'
        }
    ]
precacheAndRoute(array);

registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));
