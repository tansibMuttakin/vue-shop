import { createWebHistory, createRouter } from "vue-router";
import firebase from './firebase';
import Home from './pages/Home';
import About from './pages/About';
import CheckOut from './pages/CheckOut';
import Admin from './pages/Admin';
import Orders from './components/adminComponents/Orders';
import Category from './components/adminComponents/Category';
import Products from './components/adminComponents/Products';
import Profile from './components/adminComponents/Profile';
import Dashboard from './components/adminComponents/Dashboard';
import Invoice from './components/adminComponents/Invoice';
import NotFound from './components/NotFound';
import AllProducts from './pages/AllProducts';
import Categories from './pages/Categories';
import User from './components/adminComponents/Users';
import Roles from './components/adminComponents/Roles';
import Coupons from './components/adminComponents/Coupons';

import isAdmin from './middleware/isAdmin';

// register route path and respective components
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/category/:slug",
    name:"categories",
    props:true,
    component: Categories,
  },
  {
    path:"/checkout",
    component: CheckOut,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/admin",
    component: Admin,
    meta: { 
      requiresAuth: true,
      middleware:[isAdmin],
    },
    children: [
      { path: '', component: Dashboard},
      { path:'users',component:User},
      { path:'roles',component:Roles},
      { path: 'category', component: Category},
      { path: 'products', component: Products},
      { path: 'orders', component: Orders},
      { path: 'profile', component: Profile},
      { path: 'coupons', component: Coupons},
      { 
        path: 'invoice/:orderId',
        name:'invoice', 
        component: Invoice,
      },
    ]
  },
  {
    path:"/allProducts",
    component:AllProducts,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from,next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user && requiresAuth) {
      next('/');
    } else if(user && requiresAuth){
      if(!to.meta.middleware) {
        next();
      }
      else{
        const middleware = to.meta.middleware;
        const context = {to,from,next};
        middleware[0]({...context})
      }
    }
    else{
      next();
    }
  });

  // if(!to.meta.middleware) {
  //   next();
  // }
  // else{
  //   const middleware = to.meta.middleware;
  //   const context = {to,from,next};
  //   middleware[0]({...context})
  // }

});

export default router;