
const MAIN_ROUTES = [
      {
        path: '',
        loadChildren: () => import('../screens/splash/splash.module').then(m => m.SplashPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('../screens/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../screens/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'splash',
        loadChildren: () => import('../screens/splash/splash.module').then( m => m.SplashPageModule)
      }
];
export default MAIN_ROUTES;
