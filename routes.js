/**
 * Xpresser Router = $.router;
 * @type XpresserRouter
 */
const route = $.router;

/**
 * Name in routes is not compulsory.
 * if action of controller name is === to route name
 * You can use the .actionAsName() function,
 * As seen in about route
 */
route.get('/', 'App@index').name('index');
route.get('/about', 'App@about').actionAsName();

route.get('/comments', 'Comments@index').name('comments');
route.post('/comments', 'Comments@create').name('comments.post');
route.post('/comments/post_reply', 'Comments@post_reply').name('comments.post_reply');


