import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@/views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/apply',
        icon: 'ios-flower',
        title: '项目申请管理',
        name: 'apply',
        access: 1,
        component: Main,
        children: [
            { path: '/apply', title: '项目申请管理', name: 'apply_index', component: resolve => { require(['@/mdview/apply/apply.vue'], resolve); } }
        ]
    },
    {
        path: '/came',
        icon: 'android-document',
        title: '项目初审',
        name: 'came',
        access: 1,
        component: Main,
        children: [
            { path: '/came', title: '项目初审', name: 'came_index', component: resolve => { require(['@/mdview/came/came.vue'], resolve); } }
        ]
    },
    {
        path: '/review',
        icon: 'android-list',
        title: '项目审阅',
        name: 'review',
        access: 1,
        component: Main,
        children: [
            { path: '/review', title: '项目审阅', name: 'review_index', component: resolve => { require(['@/mdview/review/review.vue'], resolve); } }
        ]
    },
    {
        path: '/trial',
        icon: 'social-buffer',
        title: '项目会审',
        name: 'trial',
        access: 1,
        component: Main,
        children: [
            { path: '/trial', title: '项目会审', name: 'trial_index', component: resolve => { require(['@/mdview/trial/trial.vue'], resolve); } }
        ]
    },
    {
        path: '/confirm',
        icon: 'android-done-all',
        title: '项目确认',
        name: 'confirm',
        access: 1,
        component: Main,
        children: [
            { path: '/confirm', title: '项目确认', name: 'confirm_index', component: resolve => { require(['@/mdview/confirm/confirm.vue'], resolve); } }
        ]
    }
    // {
    //     path: '/msg-manage',
    //     icon: 'email',
    //     title: '站内消息',
    //     name: 'msgManage',
    //     access: 1,
    //     component: Main,
    //     children: [
    //         { path: '/msg-manage', title: '站内消息', name: 'msgManage_index', component: resolve => { require(['@/views/message/messageM.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/access',
    //     icon: 'android-alert',
    //     name: 'access',
    //     title: '系统权限',
    //     component: Main,
    //     children: [
    //         { path: '/access', title: '系统权限', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
