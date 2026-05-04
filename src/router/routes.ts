export const allRoutes = [
  {
    path: '',
    component: () => import('~/layouts/default.vue'),
    redirect: '/dashboard/ecommerce',
    children: [
        {
            path: '/apps/api-keys',
            name: 'apps.api-keys',
            meta: { title: 'Api keys' },
            component: () => import('~/views/admin/apps/api-keys/index.vue')
        },
        {
            path: '/apps/calendar',
            name: 'apps.calendar',
            meta: { title: 'Calendar' },
            component: () => import('~/views/admin/apps/calendar/index.vue')
        },
        {
            path: '/apps/chat',
            name: 'apps.chat',
            meta: { title: 'Chat' },
            component: () => import('~/views/admin/apps/chat/index.vue')
        },
        {
            path: '/apps/crm/activities',
            name: 'apps.crm.activities',
            meta: { title: 'Activities' },
            component: () => import('~/views/admin/apps/crm/activities/index.vue')
        },
        // {
        //     path: '/apps/crm/campaign',
        //     name: 'apps.crm.campaign',
        //     meta: { title: 'Campaign' },
        //     component: () => import('~/views/admin/apps/crm/campaign/index.vue')
        // },
        {
            path: '/apps/crm/contacts',
            name: 'apps.crm.contacts',
            meta: { title: 'Fournisseurs' },
            component: () => import('~/views/admin/apps/crm/contacts/index.vue')
        },
        {
            path: '/apps/crm/customers',
            name: 'apps.crm.customers',
            meta: { title: 'Clients' },
            component: () => import('~/views/admin/apps/crm/customers/index.vue')
        },
        // {
        //     path: '/apps/crm/deals',
        //     name: 'apps.crm.deals',
        //     meta: { title: 'Deals' },
        //     component: () => import('~/views/admin/apps/crm/deals/index.vue')
        // },
        // {
        //     path: '/apps/crm/estimations',
        //     name: 'apps.crm.estimations',
        //     meta: { title: 'Estimations' },
        //     component: () => import('~/views/admin/apps/crm/estimations/index.vue')
        // },
        // {
        //     path: '/apps/crm/leads',
        //     name: 'apps.crm.leads',
        //     meta: { title: 'Leads' },
        //     component: () => import('~/views/admin/apps/crm/leads/index.vue')
        // },
        // {
        //     path: '/apps/crm/opportunities',
        //     name: 'apps.crm.opportunities',
        //     meta: { title: 'Opportunities' },
        //     component: () => import('~/views/admin/apps/crm/opportunities/index.vue')
        // },
        // {
        //     path: '/apps/crm/pipeline',
        //     name: 'apps.crm.pipeline',
        //     meta: { title: 'Pipeline' },
        //     component: () => import('~/views/admin/apps/crm/pipeline/index.vue')
        // },
        // {
        //     path: '/apps/crm/proposals',
        //     name: 'apps.crm.proposals',
        //     meta: { title: 'Proposals' },
        //     component: () => import('~/views/admin/apps/crm/proposals/index.vue')
        // },
        // {
        //     path: '/apps/ecommerce/attributes',
        //     name: 'apps.ecommerce.attributes',
        //     meta: { title: 'Attributes' },
        //     component: () => import('~/views/admin/apps/ecommerce/attributes/index.vue')
        // },
        {
            path: '/apps/ecommerce/cart',
            name: 'apps.ecommerce.cart',
            meta: { title: 'Cart' },
            component: () => import('~/views/admin/apps/ecommerce/cart/index.vue')
        },
        // {
        //     path: '/apps/ecommerce/categories',
        //     name: 'apps.ecommerce.categories',
        //     meta: { title: 'Categories' },
        //     component: () => import('~/views/admin/apps/ecommerce/categories/index.vue')
        // },
        {
            path: '/apps/ecommerce/brands',
            name: 'apps.ecommerce.brands',
            meta: { title: 'Brands' },
            component: () => import('~/views/admin/apps/ecommerce/brands/index.vue')
        },
        {
            path: '/apps/ecommerce/customers',
            name: 'apps.ecommerce.customers',
            meta: { title: 'Clients' },
            component: () => import('~/views/admin/apps/ecommerce/customers/index.vue')
        },
        {
            path: '/apps/ecommerce/order-add',
            name: 'apps.ecommerce.order-add',
            meta: { title: 'Order add' },
            component: () => import('~/views/admin/apps/ecommerce/orders/order-add/index.vue')
        },
        {
            path: '/apps/ecommerce/order-details',
            name: 'apps.ecommerce.order-details',
            meta: { title: 'Order details' },
            component: () => import('~/views/admin/apps/ecommerce/orders/order-details/index.vue')
        },
        {
            path: '/apps/ecommerce/orders',
            name: 'apps.ecommerce.orders',
            meta: { title: 'Orders' },
            component: () => import('~/views/admin/apps/ecommerce/orders/orders/index.vue')
        },
        {
            path: '/apps/ecommerce/product-add',
            name: 'apps.ecommerce.product-add',
            meta: { title: 'Product add' },
            component: () => import('~/views/admin/apps/ecommerce/products/product-add/index.vue')
        },
        {
            path: '/apps/ecommerce/product-details',
            name: 'apps.ecommerce.product-details',
            meta: { title: 'Product details' },
            component: () => import('~/views/admin/apps/ecommerce/products/product-details/index.vue')
        },
        {
            path: '/apps/ecommerce/products',
            name: 'apps.ecommerce.products',
            meta: { title: 'Products' },
            component: () => import('~/views/admin/apps/ecommerce/products/products/index.vue')
        },
        {
            path: '/apps/ecommerce/products-grid',
            name: 'apps.ecommerce.products-grid',
            meta: { title: 'Products grid' },
            component: () => import('~/views/admin/apps/ecommerce/products/products-grid/index.vue')
        },
        {
            path: '/apps/ecommerce/refunds',
            name: 'apps.ecommerce.refunds',
            meta: { title: 'Refunds' },
            component: () => import('~/views/admin/apps/ecommerce/refunds/index.vue')
        },
        {
            path: '/apps/ecommerce/reviews',
            name: 'apps.ecommerce.reviews',
            meta: { title: 'Reviews' },
            component: () => import('~/views/admin/apps/ecommerce/reviews/index.vue')
        },
        {
            path: '/apps/ecommerce/seller-details',
            name: 'apps.ecommerce.seller-details',
            meta: { title: 'Seller details' },
            component: () => import('~/views/admin/apps/ecommerce/sellers/seller-details/index.vue')
        },
        {
            path: '/apps/ecommerce/sellers',
            name: 'apps.ecommerce.sellers',
            meta: { title: 'Sellers' },
            component: () => import('~/views/admin/apps/ecommerce/sellers/sellers/index.vue')
        },
        {
            path: '/apps/email/compose',
            name: 'apps.email.compose',
            meta: { title: 'Compose' },
            component: () => import('~/views/admin/apps/email/compose/index.vue')
        },
        {
            path: '/apps/email/details',
            name: 'apps.email.details',
            meta: { title: 'Details' },
            component: () => import('~/views/admin/apps/email/details/index.vue')
        },
        {
            path: '/apps/email/inbox',
            name: 'apps.email.inbox',
            meta: { title: 'Inbox' },
            component: () => import('~/views/admin/apps/email/inbox/index.vue')
        },
        {
            path: '/apps/file-manager',
            name: 'apps.file-manager',
            meta: { title: 'File manager' },
            component: () => import('~/views/admin/apps/file-manager/index.vue')
        },
        {
            path: '/apps/invoice/create',
            name: 'apps.invoice.create',
            meta: { title: 'Create' },
            component: () => import('~/views/admin/apps/invoice/create/index.vue')
        },
        {
            path: '/apps/invoice/details',
            name: 'apps.invoice.details',
            meta: { title: 'Details' },
            component: () => import('~/views/admin/apps/invoice/details/index.vue')
        },
        {
            path: '/apps/invoice/list',
            name: 'apps.invoice.list',
            meta: { title: 'List' },
            component: () => import('~/views/admin/apps/invoice/list/index.vue')
        },
        {
            path: '/apps/outlook',
            name: 'apps.outlook',
            meta: { title: 'Outlook' },
            component: () => import('~/views/admin/apps/outlook/index.vue')
        },
        {
            path: '/apps/social-feed',
            name: 'apps.social-feed',
            meta: { title: 'Social feed' },
            component: () => import('~/views/admin/apps/social-feed/index.vue')
        },
        {
            path: '/apps/ticket/create',
            name: 'apps.ticket.create',
            meta: { title: 'Create' },
            component: () => import('~/views/admin/apps/ticket/create/index.vue')
        },
        {
            path: '/apps/ticket/details',
            name: 'apps.ticket.details',
            meta: { title: 'Details' },
            component: () => import('~/views/admin/apps/ticket/details/index.vue')
        },
        {
            path: '/apps/ticket/list',
            name: 'apps.ticket.list',
            meta: { title: 'List' },
            component: () => import('~/views/admin/apps/ticket/list/index.vue')
        },
        {
            path: '/apps/users/account-settings',
            name: 'apps.users.account-settings',
            meta: { title: 'Account settings' },
            component: () => import('~/views/admin/apps/users/account-settings/index.vue')
        },
        {
            path: '/apps/users/contacts',
            name: 'apps.users.contacts',
            meta: { title: 'Contacts' },
            component: () => import('~/views/admin/apps/users/contacts/index.vue')
        },
        {
            path: '/apps/users/permissions',
            name: 'apps.users.permissions',
            meta: { title: 'Permissions' },
            component: () => import('~/views/admin/apps/users/permissions/index.vue')
        },
        {
            path: '/apps/users/profile',
            name: 'apps.users.profile',
            meta: { title: 'Profile' },
            component: () => import('~/views/admin/apps/users/profile/index.vue')
        },
        {
            path: '/apps/users/role-details',
            name: 'apps.users.role-details',
            meta: { title: 'Role details' },
            component: () => import('~/views/admin/apps/users/role-details/index.vue')
        },
        {
            path: '/apps/users/roles',
            name: 'apps.users.roles',
            meta: { title: 'Roles' },
            component: () => import('~/views/admin/apps/users/roles/index.vue')
        },
        {
            path: '/charts/apex/area',
            name: 'charts.apex.area',
            meta: { title: 'Area' },
            component: () => import('~/views/admin/charts/apex/area/index.vue')
        },
        {
            path: '/charts/apex/bar',
            name: 'charts.apex.bar',
            meta: { title: 'Bar' },
            component: () => import('~/views/admin/charts/apex/bar/index.vue')
        },
        {
            path: '/charts/apex/boxplot',
            name: 'charts.apex.boxplot',
            meta: { title: 'Boxplot' },
            component: () => import('~/views/admin/charts/apex/boxplot/index.vue')
        },
        {
            path: '/charts/apex/bubble',
            name: 'charts.apex.bubble',
            meta: { title: 'Bubble' },
            component: () => import('~/views/admin/charts/apex/bubble/index.vue')
        },
        {
            path: '/charts/apex/candlestick',
            name: 'charts.apex.candlestick',
            meta: { title: 'Candlestick' },
            component: () => import('~/views/admin/charts/apex/candlestick/index.vue')
        },
        {
            path: '/charts/apex/column',
            name: 'charts.apex.column',
            meta: { title: 'Column' },
            component: () => import('~/views/admin/charts/apex/column/index.vue')
        },
        {
            path: '/charts/apex/funnel',
            name: 'charts.apex.funnel',
            meta: { title: 'Funnel' },
            component: () => import('~/views/admin/charts/apex/funnel/index.vue')
        },
        {
            path: '/charts/apex/heatmap',
            name: 'charts.apex.heatmap',
            meta: { title: 'Heatmap' },
            component: () => import('~/views/admin/charts/apex/heatmap/index.vue')
        },
        {
            path: '/charts/apex/line',
            name: 'charts.apex.line',
            meta: { title: 'Line' },
            component: () => import('~/views/admin/charts/apex/line/index.vue')
        },
        {
            path: '/charts/apex/mixed',
            name: 'charts.apex.mixed',
            meta: { title: 'Mixed' },
            component: () => import('~/views/admin/charts/apex/mixed/index.vue')
        },
        {
            path: '/charts/apex/pie',
            name: 'charts.apex.pie',
            meta: { title: 'Pie' },
            component: () => import('~/views/admin/charts/apex/pie/index.vue')
        },
        {
            path: '/charts/apex/polar-area',
            name: 'charts.apex.polar-area',
            meta: { title: 'Polar area' },
            component: () => import('~/views/admin/charts/apex/polar-area/index.vue')
        },
        {
            path: '/charts/apex/radar',
            name: 'charts.apex.radar',
            meta: { title: 'Radar' },
            component: () => import('~/views/admin/charts/apex/radar/index.vue')
        },
        {
            path: '/charts/apex/radialbar',
            name: 'charts.apex.radialbar',
            meta: { title: 'Radialbar' },
            component: () => import('~/views/admin/charts/apex/radialbar/index.vue')
        },
        {
            path: '/charts/apex/range',
            name: 'charts.apex.range',
            meta: { title: 'Range' },
            component: () => import('~/views/admin/charts/apex/range/index.vue')
        },
        {
            path: '/charts/apex/scatter',
            name: 'charts.apex.scatter',
            meta: { title: 'Scatter' },
            component: () => import('~/views/admin/charts/apex/scatter/index.vue')
        },
        {
            path: '/charts/apex/slope',
            name: 'charts.apex.slope',
            meta: { title: 'Slope' },
            component: () => import('~/views/admin/charts/apex/slope/index.vue')
        },
        {
            path: '/charts/apex/sparklines',
            name: 'charts.apex.sparklines',
            meta: { title: 'Sparklines' },
            component: () => import('~/views/admin/charts/apex/sparklines/index.vue')
        },
        {
            path: '/charts/apex/timeline',
            name: 'charts.apex.timeline',
            meta: { title: 'Timeline' },
            component: () => import('~/views/admin/charts/apex/timeline/index.vue')
        },
        {
            path: '/charts/apex/treemap',
            name: 'charts.apex.treemap',
            meta: { title: 'Treemap' },
            component: () => import('~/views/admin/charts/apex/treemap/index.vue')
        },
        {
            path: '/charts/chartjs/area',
            name: 'charts.chartjs.area',
            meta: { title: 'Area' },
            component: () => import('~/views/admin/charts/chartjs/area/index.vue')
        },
        {
            path: '/charts/chartjs/bar',
            name: 'charts.chartjs.bar',
            meta: { title: 'Bar' },
            component: () => import('~/views/admin/charts/chartjs/bar/index.vue')
        },
        {
            path: '/charts/chartjs/line',
            name: 'charts.chartjs.line',
            meta: { title: 'Line' },
            component: () => import('~/views/admin/charts/chartjs/line/index.vue')
        },
        {
            path: '/charts/chartjs/other',
            name: 'charts.chartjs.other',
            meta: { title: 'Other' },
            component: () => import('~/views/admin/charts/chartjs/other/index.vue')
        },
        {
            path: '/dashboard/ecommerce',
            name: 'dashboard.ecommerce',
            meta: { title: 'Ecommerce' },
            component: () => import('~/views/admin/dashboard/ecommerce/index.vue')
        },
        {
            path: '/dashboard/projects',
            name: 'dashboard.projects',
            meta: { title: 'Projects' },
            component: () => import('~/views/admin/dashboard/projects/index.vue')
        },
        {
            path: '/form/elements',
            name: 'form.elements',
            meta: { title: 'Elements' },
            component: () => import('~/views/admin/form/elements/index.vue')
        },
        {
            path: '/form/fileuploads',
            name: 'form.fileuploads',
            meta: { title: 'Fileuploads' },
            component: () => import('~/views/admin/form/fileuploads/index.vue')
        },
        {
            path: '/form/layout',
            name: 'form.layout',
            meta: { title: 'Layout' },
            component: () => import('~/views/admin/form/layout/index.vue')
        },
        {
            path: '/form/other-plugin',
            name: 'form.other-plugin',
            meta: { title: 'Other plugin' },
            component: () => import('~/views/admin/form/other-plugin/index.vue')
        },
        {
            path: '/form/pickers',
            name: 'form.pickers',
            meta: { title: 'Pickers' },
            component: () => import('~/views/admin/form/pickers/index.vue')
        },
        {
            path: '/form/range-slider',
            name: 'form.range-slider',
            meta: { title: 'Range slider' },
            component: () => import('~/views/admin/form/range-slider/index.vue')
        },
        {
            path: '/form/select',
            name: 'form.select',
            meta: { title: 'Select' },
            component: () => import('~/views/admin/form/select/index.vue')
        },
        {
            path: '/form/text-editors',
            name: 'form.text-editors',
            meta: { title: 'Text editors' },
            component: () => import('~/views/admin/form/text-editors/index.vue')
        },
        {
            path: '/form/validation',
            name: 'form.validation',
            meta: { title: 'Validation' },
            component: () => import('~/views/admin/form/validation/index.vue')
        },
        {
            path: '/form/wizard',
            name: 'form.wizard',
            meta: { title: 'Wizard' },
            component: () => import('~/views/admin/form/wizard/index.vue')
        },
        {
            path: '/icons/flags',
            name: 'icons.flags',
            meta: { title: 'Flags' },
            component: () => import('~/views/admin/icons/flags/index.vue')
        },
        {
            path: '/icons/lucide',
            name: 'icons.lucide',
            meta: { title: 'Lucide' },
            component: () => import('~/views/admin/icons/lucide/index.vue')
        },
        {
            path: '/icons/tabler',
            name: 'icons.tabler',
            meta: { title: 'Tabler' },
            component: () => import('~/views/admin/icons/tabler/index.vue')
        },
        {
            path: '/layouts/boxed',
            name: 'layouts.boxed',
            meta: { title: 'Boxed' },
            component: () => import('~/views/admin/layouts/boxed/index.vue')
        },
        {
            path: '/layouts/compact',
            name: 'layouts.compact',
            meta: { title: 'Compact' },
            component: () => import('~/views/admin/layouts/compact/index.vue')
        },
        {
            path: '/layouts/horizontal',
            name: 'layouts.horizontal',
            meta: { title: 'Horizontal' },
            component: () => import('~/views/admin/layouts/horizontal/index.vue')
        },
        {
            path: '/layouts/preloader',
            name: 'layouts.preloader',
            meta: { title: 'Preloader' },
            component: () => import('~/views/admin/layouts/preloader/index.vue')
        },
        {
            path: '/layouts/scrollable',
            name: 'layouts.scrollable',
            meta: { title: 'Scrollable' },
            component: () => import('~/views/admin/layouts/scrollable/index.vue')
        },
        {
            path: '/layouts/sidebar-compact',
            name: 'layouts.sidebar-compact',
            meta: { title: 'Sidebar compact' },
            component: () => import('~/views/admin/layouts/sidebar-compact/index.vue')
        },
        {
            path: '/layouts/sidebar-dark',
            name: 'layouts.sidebar-dark',
            meta: { title: 'Sidebar dark' },
            component: () => import('~/views/admin/layouts/sidebar-dark/index.vue')
        },
        {
            path: '/layouts/sidebar-gradient',
            name: 'layouts.sidebar-gradient',
            meta: { title: 'Sidebar gradient' },
            component: () => import('~/views/admin/layouts/sidebar-gradient/index.vue')
        },
        {
            path: '/layouts/sidebar-gray',
            name: 'layouts.sidebar-gray',
            meta: { title: 'Sidebar gray' },
            component: () => import('~/views/admin/layouts/sidebar-gray/index.vue')
        },
        {
            path: '/layouts/sidebar-image',
            name: 'layouts.sidebar-image',
            meta: { title: 'Sidebar image' },
            component: () => import('~/views/admin/layouts/sidebar-image/index.vue')
        },
        {
            path: '/layouts/sidebar-no-icons',
            name: 'layouts.sidebar-no-icons',
            meta: { title: 'Sidebar no icons' },
            component: () => import('~/views/admin/layouts/sidebar-no-icons/index.vue')
        },
        {
            path: '/layouts/sidebar-offcanvas',
            name: 'layouts.sidebar-offcanvas',
            meta: { title: 'Sidebar offcanvas' },
            component: () => import('~/views/admin/layouts/sidebar-offcanvas/index.vue')
        },
        {
            path: '/layouts/sidebar-on-hover',
            name: 'layouts.sidebar-on-hover',
            meta: { title: 'Sidebar on hover' },
            component: () => import('~/views/admin/layouts/sidebar-on-hover/index.vue')
        },
        {
            path: '/layouts/sidebar-on-hover-active',
            name: 'layouts.sidebar-on-hover-active',
            meta: { title: 'Sidebar on hover active' },
            component: () => import('~/views/admin/layouts/sidebar-on-hover-active/index.vue')
        },
        {
            path: '/layouts/sidebar-with-lines',
            name: 'layouts.sidebar-with-lines',
            meta: { title: 'Sidebar with lines' },
            component: () => import('~/views/admin/layouts/sidebar-with-lines/index.vue')
        },
        {
            path: '/layouts/topbar-gradient',
            name: 'layouts.topbar-gradient',
            meta: { title: 'Topbar gradient' },
            component: () => import('~/views/admin/layouts/topbar-gradient/index.vue')
        },
        {
            path: '/layouts/topbar-gray',
            name: 'layouts.topbar-gray',
            meta: { title: 'Topbar gray' },
            component: () => import('~/views/admin/layouts/topbar-gray/index.vue')
        },
        {
            path: '/layouts/topbar-light',
            name: 'layouts.topbar-light',
            meta: { title: 'Topbar light' },
            component: () => import('~/views/admin/layouts/topbar-light/index.vue')
        },
        {
            path: '/maps/leaflet',
            name: 'maps.leaflet',
            meta: { title: 'Leaflet' },
            component: () => import('~/views/admin/maps/leaflet/index.vue')
        },
        {
            path: '/maps/vector',
            name: 'maps.vector',
            meta: { title: 'Vector' },
            component: () => import('~/views/admin/maps/vector/index.vue')
        },
        {
            path: '/pages/empty',
            name: 'pages.empty',
            meta: { title: 'Empty' },
            component: () => import('~/views/admin/pages/empty/index.vue')
        },
        {
            path: '/pages/faq',
            name: 'pages.faq',
            meta: { title: 'Faq' },
            component: () => import('~/views/admin/pages/faq/index.vue')
        },
        {
            path: '/pages/pricing',
            name: 'pages.pricing',
            meta: { title: 'Pricing' },
            component: () => import('~/views/admin/pages/pricing/index.vue')
        },
        {
            path: '/pages/privacy-policy',
            name: 'pages.privacy-policy',
            meta: { title: 'Privacy policy' },
            component: () => import('~/views/admin/pages/privacy-policy/index.vue')
        },
        {
            path: '/pages/search-results',
            name: 'pages.search-results',
            meta: { title: 'Search results' },
            component: () => import('~/views/admin/pages/search-results/index.vue')
        },
        {
            path: '/pages/terms-conditions',
            name: 'pages.terms-conditions',
            meta: { title: 'Terms conditions' },
            component: () => import('~/views/admin/pages/terms-conditions/index.vue')
        },
        {
            path: '/pages/timeline',
            name: 'pages.timeline',
            meta: { title: 'Timeline' },
            component: () => import('~/views/admin/pages/timeline/index.vue')
        },
        {
            path: '/plugins/animation',
            name: 'plugins.animation',
            meta: { title: 'Animation' },
            component: () => import('~/views/admin/plugins/animation/index.vue')
        },
        {
            path: '/plugins/clipboard',
            name: 'plugins.clipboard',
            meta: { title: 'Clipboard' },
            component: () => import('~/views/admin/plugins/clipboard/index.vue')
        },
        {
            path: '/plugins/pass-meter',
            name: 'plugins.pass-meter',
            meta: { title: 'Pass meter' },
            component: () => import('~/views/admin/plugins/pass-meter/index.vue')
        },
        {
            path: '/plugins/pdf-viewer',
            name: 'plugins.pdf-viewer',
            meta: { title: 'Pdf viewer' },
            component: () => import('~/views/admin/plugins/pdf-viewer/index.vue')
        },
        {
            path: '/plugins/sweet-alerts',
            name: 'plugins.sweet-alerts',
            meta: { title: 'Sweet alerts' },
            component: () => import('~/views/admin/plugins/sweet-alerts/index.vue')
        },
        {
            path: '/plugins/tour',
            name: 'plugins.tour',
            meta: { title: 'Tour' },
            component: () => import('~/views/admin/plugins/tour/index.vue')
        },
        {
            path: '/tables/custom',
            name: 'tables.custom',
            meta: { title: 'Custom' },
            component: () => import('~/views/admin/tables/custom/index.vue')
        },
        {
            path: '/tables/datatables/ajax',
            name: 'tables.datatables.ajax',
            meta: { title: 'Ajax' },
            component: () => import('~/views/admin/tables/datatables/ajax/index.vue')
        },
        {
            path: '/tables/datatables/basic',
            name: 'tables.datatables.basic',
            meta: { title: 'Basic' },
            component: () => import('~/views/admin/tables/datatables/basic/index.vue')
        },
        {
            path: '/tables/datatables/checkbox-select',
            name: 'tables.datatables.checkbox-select',
            meta: { title: 'Checkbox select' },
            component: () => import('~/views/admin/tables/datatables/checkbox-select/index.vue')
        },
        {
            path: '/tables/datatables/column-searching',
            name: 'tables.datatables.column-searching',
            meta: { title: 'Column searching' },
            component: () => import('~/views/admin/tables/datatables/column-searching/index.vue')
        },
        {
            path: '/tables/datatables/columns',
            name: 'tables.datatables.columns',
            meta: { title: 'Columns' },
            component: () => import('~/views/admin/tables/datatables/columns/index.vue')
        },
        {
            path: '/tables/datatables/export-data',
            name: 'tables.datatables.export-data',
            meta: { title: 'Export data' },
            component: () => import('~/views/admin/tables/datatables/export-data/index.vue')
        },
        {
            path: '/tables/datatables/fixed-columns',
            name: 'tables.datatables.fixed-columns',
            meta: { title: 'Fixed columns' },
            component: () => import('~/views/admin/tables/datatables/fixed-columns/index.vue')
        },
        {
            path: '/tables/datatables/fixed-header',
            name: 'tables.datatables.fixed-header',
            meta: { title: 'Fixed header' },
            component: () => import('~/views/admin/tables/datatables/fixed-header/index.vue')
        },
        {
            path: '/tables/datatables/javascript',
            name: 'tables.datatables.javascript',
            meta: { title: 'Javascript' },
            component: () => import('~/views/admin/tables/datatables/javascript/index.vue')
        },
        {
            path: '/tables/datatables/rendering',
            name: 'tables.datatables.rendering',
            meta: { title: 'Rendering' },
            component: () => import('~/views/admin/tables/datatables/rendering/index.vue')
        },
        {
            path: '/tables/datatables/rows-add',
            name: 'tables.datatables.rows-add',
            meta: { title: 'Rows add' },
            component: () => import('~/views/admin/tables/datatables/rows-add/index.vue')
        },
        {
            path: '/tables/datatables/scroll',
            name: 'tables.datatables.scroll',
            meta: { title: 'Scroll' },
            component: () => import('~/views/admin/tables/datatables/scroll/index.vue')
        },
        {
            path: '/tables/datatables/select',
            name: 'tables.datatables.select',
            meta: { title: 'Select' },
            component: () => import('~/views/admin/tables/datatables/select/index.vue')
        },
        {
            path: '/tables/static',
            name: 'tables.static',
            meta: { title: 'Static' },
            component: () => import('~/views/admin/tables/static/index.vue')
        },
        {
            path: '/ui/accordions',
            name: 'ui.accordions',
            meta: { title: 'Accordions' },
            component: () => import('~/views/admin/ui/accordions/index.vue')
        },
        {
            path: '/ui/alerts',
            name: 'ui.alerts',
            meta: { title: 'Alerts' },
            component: () => import('~/views/admin/ui/alerts/index.vue')
        },
        {
            path: '/ui/badges',
            name: 'ui.badges',
            meta: { title: 'Badges' },
            component: () => import('~/views/admin/ui/badges/index.vue')
        },
        {
            path: '/ui/breadcrumb',
            name: 'ui.breadcrumb',
            meta: { title: 'Breadcrumb' },
            component: () => import('~/views/admin/ui/breadcrumb/index.vue')
        },
        {
            path: '/ui/buttons',
            name: 'ui.buttons',
            meta: { title: 'Buttons' },
            component: () => import('~/views/admin/ui/buttons/index.vue')
        },
        {
            path: '/ui/cards',
            name: 'ui.cards',
            meta: { title: 'Cards' },
            component: () => import('~/views/admin/ui/cards/index.vue')
        },
        {
            path: '/ui/carousel',
            name: 'ui.carousel',
            meta: { title: 'Carousel' },
            component: () => import('~/views/admin/ui/carousel/index.vue')
        },
        {
            path: '/ui/collapse',
            name: 'ui.collapse',
            meta: { title: 'Collapse' },
            component: () => import('~/views/admin/ui/collapse/index.vue')
        },
        {
            path: '/ui/colors',
            name: 'ui.colors',
            meta: { title: 'Colors' },
            component: () => import('~/views/admin/ui/colors/index.vue')
        },
        {
            path: '/ui/dropdowns',
            name: 'ui.dropdowns',
            meta: { title: 'Dropdowns' },
            component: () => import('~/views/admin/ui/dropdowns/index.vue')
        },
        {
            path: '/ui/grid',
            name: 'ui.grid',
            meta: { title: 'Grid' },
            component: () => import('~/views/admin/ui/grid/index.vue')
        },
        {
            path: '/ui/images',
            name: 'ui.images',
            meta: { title: 'Images' },
            component: () => import('~/views/admin/ui/images/index.vue')
        },
        {
            path: '/ui/links',
            name: 'ui.links',
            meta: { title: 'Links' },
            component: () => import('~/views/admin/ui/links/index.vue')
        },
        {
            path: '/ui/list-group',
            name: 'ui.list-group',
            meta: { title: 'List group' },
            component: () => import('~/views/admin/ui/list-group/index.vue')
        },
        {
            path: '/ui/modals',
            name: 'ui.modals',
            meta: { title: 'Modals' },
            component: () => import('~/views/admin/ui/modals/index.vue')
        },
        {
            path: '/ui/notifications',
            name: 'ui.notifications',
            meta: { title: 'Notifications' },
            component: () => import('~/views/admin/ui/notifications/index.vue')
        },
        {
            path: '/ui/offcanvas',
            name: 'ui.offcanvas',
            meta: { title: 'Offcanvas' },
            component: () => import('~/views/admin/ui/offcanvas/index.vue')
        },
        {
            path: '/ui/pagination',
            name: 'ui.pagination',
            meta: { title: 'Pagination' },
            component: () => import('~/views/admin/ui/pagination/index.vue')
        },
        {
            path: '/ui/placeholders',
            name: 'ui.placeholders',
            meta: { title: 'Placeholders' },
            component: () => import('~/views/admin/ui/placeholders/index.vue')
        },
        {
            path: '/ui/popovers',
            name: 'ui.popovers',
            meta: { title: 'Popovers' },
            component: () => import('~/views/admin/ui/popovers/index.vue')
        },
        {
            path: '/ui/progress',
            name: 'ui.progress',
            meta: { title: 'Progress' },
            component: () => import('~/views/admin/ui/progress/index.vue')
        },
        {
            path: '/ui/spinners',
            name: 'ui.spinners',
            meta: { title: 'Spinners' },
            component: () => import('~/views/admin/ui/spinners/index.vue')
        },
        {
            path: '/ui/tabs',
            name: 'ui.tabs',
            meta: { title: 'Tabs' },
            component: () => import('~/views/admin/ui/tabs/index.vue')
        },
        {
            path: '/ui/tooltips',
            name: 'ui.tooltips',
            meta: { title: 'Tooltips' },
            component: () => import('~/views/admin/ui/tooltips/index.vue')
        },
        {
            path: '/ui/typography',
            name: 'ui.typography',
            meta: { title: 'Typography' },
            component: () => import('~/views/admin/ui/typography/index.vue')
        },
        {
            path: '/ui/utilities',
            name: 'ui.utilities',
            meta: { title: 'Utilities' },
            component: () => import('~/views/admin/ui/utilities/index.vue')
        },
        {
            path: '/ui/videos',
            name: 'ui.videos',
            meta: { title: 'Videos' },
            component: () => import('~/views/admin/ui/videos/index.vue')
        },
        {
            path: '/widgets',
            name: 'widgets',
            meta: { title: 'Widgets' },
            component: () => import('~/views/admin/widgets/index.vue')
        },
    ],
  },
        {
            path: '/auth/delete-account',
            name: 'auth.delete-account',
            meta: { title: 'Delete account' },
            component: () => import('~/views/auth/basic/delete-account/index.vue')
        },
        {
            path: '/auth/lock-screen',
            name: 'auth.lock-screen',
            meta: { title: 'Lock screen' },
            component: () => import('~/views/auth/basic/lock-screen/index.vue')
        },
        {
            path: '/auth/login-pin',
            name: 'auth.login-pin',
            meta: { title: 'Login pin' },
            component: () => import('~/views/auth/basic/login-pin/index.vue')
        },
        {
            path: '/auth/new-pass',
            name: 'auth.new-pass',
            meta: { title: 'New pass' },
            component: () => import('~/views/auth/basic/new-pass/index.vue')
        },
        {
            path: '/auth/reset-pass',
            name: 'auth.reset-pass',
            meta: { title: 'Reset pass' },
            component: () => import('~/views/auth/basic/reset-pass/index.vue')
        },
        {
            path: '/auth/sign-in',
            name: 'auth.sign-in',
            meta: { title: 'Sign in' },
            component: () => import('~/views/auth/basic/sign-in/index.vue')
        },
        {
            path: '/auth/sign-up',
            name: 'auth.sign-up',
            meta: { title: 'Sign up' },
            component: () => import('~/views/auth/basic/sign-up/index.vue')
        },
        {
            path: '/auth/split/delete-account',
            name: 'auth.split.delete-account',
            meta: { title: 'Delete account' },
            component: () => import('~/views/auth/split/delete-account/index.vue')
        },
        {
            path: '/auth/split/lock-screen',
            name: 'auth.split.lock-screen',
            meta: { title: 'Lock screen' },
            component: () => import('~/views/auth/split/lock-screen/index.vue')
        },
        {
            path: '/auth/split/login-pin',
            name: 'auth.split.login-pin',
            meta: { title: 'Login pin' },
            component: () => import('~/views/auth/split/login-pin/index.vue')
        },
        {
            path: '/auth/split/new-pass',
            name: 'auth.split.new-pass',
            meta: { title: 'New pass' },
            component: () => import('~/views/auth/split/new-pass/index.vue')
        },
        {
            path: '/auth/split/reset-pass',
            name: 'auth.split.reset-pass',
            meta: { title: 'Reset pass' },
            component: () => import('~/views/auth/split/reset-pass/index.vue')
        },
        {
            path: '/auth/split/sign-in',
            name: 'auth.split.sign-in',
            meta: { title: 'Sign in' },
            component: () => import('~/views/auth/split/sign-in/index.vue')
        },
        {
            path: '/auth/split/sign-up',
            name: 'auth.split.sign-up',
            meta: { title: 'Sign up' },
            component: () => import('~/views/auth/split/sign-up/index.vue')
        },
        {
            path: '/auth/split/success-mail',
            name: 'auth.split.success-mail',
            meta: { title: 'Success mail' },
            component: () => import('~/views/auth/split/success-mail/index.vue')
        },
        {
            path: '/auth/split/two-factor',
            name: 'auth.split.two-factor',
            meta: { title: 'Two factor' },
            component: () => import('~/views/auth/split/two-factor/index.vue')
        },
        {
            path: '/auth/success-mail',
            name: 'auth.success-mail',
            meta: { title: 'Success mail' },
            component: () => import('~/views/auth/basic/success-mail/index.vue')
        },
        {
            path: '/auth/two-factor',
            name: 'auth.two-factor',
            meta: { title: 'Two factor' },
            component: () => import('~/views/auth/basic/two-factor/index.vue')
        },
        {
            path: '/error/400',
            name: 'error.400',
            meta: { title: '400' },
            component: () => import('~/views/error/400/index.vue')
        },
        {
            path: '/error/401',
            name: 'error.401',
            meta: { title: '401' },
            component: () => import('~/views/error/401/index.vue')
        },
        {
            path: '/error/403',
            name: 'error.403',
            meta: { title: '403' },
            component: () => import('~/views/error/403/index.vue')
        },
        {
            path: '/error/404',
            name: 'error.404',
            meta: { title: '404' },
            component: () => import('~/views/error/404/index.vue')
        },
        {
            path: '/error/408',
            name: 'error.408',
            meta: { title: '408' },
            component: () => import('~/views/error/408/index.vue')
        },
        {
            path: '/error/500',
            name: 'error.500',
            meta: { title: '500' },
            component: () => import('~/views/error/500/index.vue')
        },
        {
            path: '/error/maintenance',
            name: 'error.maintenance',
            meta: { title: 'Maintenance' },
            component: () => import('~/views/error/maintenance/index.vue')
        },
        {
            path: '/landing',
            name: 'landing',
            meta: { title: 'Landing' },
            component: () => import('~/views/landing/index.vue')
        },
        {
            path: '/pages/coming-soon',
            name: 'pages.coming-soon',
            meta: { title: 'Coming soon' },
            component: () => import('~/views/others/pages/coming-soon/index.vue')
        },
]
