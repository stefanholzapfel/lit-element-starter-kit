import { Router } from '@vaadin/router';
import { LitElementStateService } from './state/litElementState.service';

export class RouterService {
    public static init(outlet: HTMLElement): RouterService {
        if (!RouterService.initialized) {
            RouterService.router = new Router(outlet);
            RouterService.router.setRoutes(RouterService.getRouteConfig());
            RouterService.setRouteChangeListener();
            RouterService.initialized = true;
            return RouterService;
        } else {
            console.log('Already initialized RouterService!');
        }
    }
    
    private static router;
    private static currentRoute;
    private static previousRoute = null;
    private static initialized = false;
    
    static navigate(route: string): void {
        Router.go(route);
    }
    
    static getPreviousRoute(): string | null {
        return RouterService.previousRoute;
    }
    
    static getCurrentRoute(): string {
        return RouterService.currentRoute;
    }
    
    static changeUrlSegmentWithoutRouteChange(
        segmentNumber: number,
        newValue: string
    ) {
        const pathArray = window.location.pathname.split( '/' );
        pathArray[segmentNumber] = newValue;
        const newUrl = pathArray.join('/');
        window.history.pushState(null, null, newUrl);
    }
    
    private static setRouteChangeListener() {
        window.addEventListener(
            'vaadin-router-location-changed',
            event => {
                RouterService.previousRoute = RouterService.currentRoute;
                RouterService.currentRoute = (event as any).detail.location.pathname;
                LitElementStateService.set({
                    app: {
                        previousRoute: RouterService.previousRoute,
                        currentRoute: RouterService.currentRoute
                    }
                });
            }
        );
    }
    
    private static getRouteConfig(): {}[] {
        return [
            {
                path: '/page1',
                action: () => {
                    import('../views/app-layout/pages/page1/page1');
                },
                component: 'page1'
            },
            {
                path: '/page2',
                children: [
                    {
                        path: '/',
                        action: () => {
                            import('../views/app-layout/pages/page2/page2');
                        },
                        component: 'page2'
                    },
                    {
                        path: '/:id',
                        action: async (context, commands) => {
                            import('../views/app-layout/pages/page2/page2');
                        },
                        component: 'page2'
                    },
                ]
            },
            {
                path: '(.*)',
                action: () => {
                    import('../views/app-layout/pages/main/main');
                },
                component: 'sp-intro'
            }
        ];
    }
}
