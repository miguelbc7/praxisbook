import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ 
		path: '',
		redirectTo: 'login',
		pathMatch: 'full' 
	},
	{ 
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
	},
	{
		path: 'register',
		loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
	},
	{
		path: 'library',
		loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule)
	},
	{
		path: 'articles',
		loadChildren: () => import('./pages/articles/articles.module').then( m => m.ArticlesPageModule)
	},
	{
		path: 'profile',
		loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
	},
	{
		path: 'book',
		loadChildren: () => import('./pages/book/book.module').then( m => m.BookPageModule)
	},
	{
		path: 'book/:id',
		loadChildren: () => import('./pages/book/book.module').then( m => m.BookPageModule)
	},
	{
		path: 'buy-book',
		loadChildren: () => import('./pages/buy-book/buy-book.module').then( m => m.BuyBookPageModule)
	},
	{
		path: 'buy-book/:id',
		loadChildren: () => import('./pages/buy-book/buy-book.module').then( m => m.BuyBookPageModule)
	},
	{
		path: 'notifications',
		loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
	},
	{
		path: 'detail-notifications',
		loadChildren: () => import('./pages/detail-notifications/detail-notifications.module').then( m => m.DetailNotificationsPageModule)
	},
	{
		path: 'sregister',
		loadChildren: () => import('./pages/sregister/sregister.module').then( m => m.SregisterPageModule)
	},
	{
		path: 'detail-article',
		loadChildren: () => import('./pages/detail-article/detail-article.module').then( m => m.DetailArticlePageModule)
	},
	{
		path: 'detail-article/:number',
		loadChildren: () => import('./pages/detail-article/detail-article.module').then( m => m.DetailArticlePageModule)
	},
	{
		path: 'edit-user',
		loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
	},
	{
		path: 'edit-password',
		loadChildren: () => import('./pages/edit-password/edit-password.module').then( m => m.EditPasswordPageModule)
	},
	{
		path: 'share',
		loadChildren: () => import('./pages/share/share.module').then( m => m.SharePageModule)
	},
  {
    path: 'highlights',
    loadChildren: () => import('./pages/highlights/highlights.module').then( m => m.HighlightsPageModule)
  },
  {
    path: 'adicional',
    loadChildren: () => import('./pages/adicional/adicional.module').then( m => m.AdicionalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
