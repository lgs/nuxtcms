/* eslint-disable no-console */

import contentRoutes from '@/static/api/routes/content'
const isContentRoute = (path, contentRoutes) => contentRoutes.some(route => path.includes(route))

export default function (context) {
  const handleContentItem = !!(process.client && context.params.slug && isContentRoute(context.route.path, contentRoutes))

  if (handleContentItem) {
    console.log('From Middleware - handleContentItem TRUE: ', context.route)
    const { route, params, $vStore } = context
    const contentType = route.name.replace('-slug', '')
    $vStore.currentContentItem = $vStore[contentType].find(post => post.slug === params.slug)

    console.log('From Middleware Just set currentContentItem')
    console.log(`From Middleware - ${contentType}: `, $vStore.currentContentItem)
  }
}