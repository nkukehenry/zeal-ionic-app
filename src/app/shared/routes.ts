
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
      },
      {
        path: 'forex',
        loadChildren: () => import('../screens/forex/forex.module').then(m => m.ForexPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../screens/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'exchange',
        loadChildren: () => import('../screens/exchange/exchange.module').then(m => m.ExchangePageModule)
      },
      {
        path: 'verify-login',
        loadChildren: () => import('../screens/verify-login/verify-login.module').then(m => m.VerifyLoginPageModule)
      },
      {
        path: 'beneficiaries',
        loadChildren: () => import('../screens/beneficiaries/beneficiaries.module').then(m => m.BeneficiariesPageModule)
      },
      {
        path: 'refferals',
        loadChildren: () => import('../screens/refferals/refferals.module').then(m => m.RefferalsPageModule)
      },
      {
        path: 'change-pass',
        loadChildren: () => import('../screens/change-pass/change-pass.module').then(m => m.ChangePassPageModule)
      },
      {
        path: 'remmit',
        loadChildren: () => import('../screens/remmit/remmit.module').then(m => m.RemmitPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../screens/contact/contact.module').then(m => m.ContactPageModule)
      }
      
];
export default MAIN_ROUTES;
