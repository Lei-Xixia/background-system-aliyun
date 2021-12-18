import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist  白名单

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasGetUserInfo = store.getters.user; // 获取本地用户信息

  if (to.meta.auth) {
    // 说明页面需要鉴权
    if (hasGetUserInfo) {
      // 说明有用户信息，直接放行
      next()
    } else {
      // 没有用户信息，看一下是否有token
      const hasToken = localStorage.getItem("adminToken");
      if (hasToken) {
        // 有token 我们还需要验证一下token的有效性
        try{
          // 恢复登录状态
          await store.dispatch('user/getInfo');
          next();
        } catch(error){
          await store.dispatch('user/resetToken');
          Message.error('登录过期，请重新登录');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        // 说明没有token, 需要重新登录
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    // 说明页面不需要鉴权
    if (to.path === "/login" && hasGetUserInfo) {
      // 说明此时是在登录的状态下，要去 login 页面， 我们此时可以将他导航到首页
      next({ path: "/" });
    } else {
      next();
    }
    NProgress.done();  // 进度条
  }

  // determine whether the user has logged in
  // 去拿token，判断是否有token
  // const hasToken = getToken()

  // 下方是vue-element-admin原本的鉴权流程
  // if (hasToken) {
  //   // 有token
  //   // 判断访问的是否是login,是的话直接放行，导航到首页
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     // 进入的不是login，判断本地是否有用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       // 有用户信息，放行
  //       next()
  //     } else {
  //       // 没有用户信息，但是有token,接下来就使用localStorage里面的token去服务器拿用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')
  //         // 获取成功用户信息，放行
  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         // 重置token
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         // 导航到登录页面
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   // 没有token，判断要进入的是否是白名单里面的内容
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     // 直接放行
  //     next()
  //   } else {
  //     // 说明要进入的名单不在白名单里面，没有权限进入，路径导航到登录的界面
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
