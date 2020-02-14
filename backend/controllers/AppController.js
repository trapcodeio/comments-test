'use strict';

/**
 * AppController
 * @class
 * @extends $.controller
 */
class AppController extends $.controller {

    /**
     * Boot Method
     *
     * Must be static.
     * Serves as a middleware for all roots
     *
     * Whatever is returned in boot method
     * is passed as the second method on all methods.
     *
     * @param {Xpresser.Http} http
     * @return {object|*}
     */
    static boot(http) {
        /**
         * Set a user variable that will be passed to all methods
         * This should maybe come from a database.
         */
        const user = {
            name: "Developer",
            email: "developer@example.com",
        };

        /**
         * Set Theme config in boot.
         * We dont want to keep retyping it in all methods
         *
         *
         * if we have ?theme=name in url query we would use that else we use project config.
         * we have to save the theme in session in case switch is used.
         * Only required for the switch theme button function.
         *
         * $.$config is an instance of https://npmjs.com/package/object-collection
         * Helps you get config variables or set default if they don't
         * exist to avoid errors.
         */
        let theme = http.query("theme", null);

        // Check if theme is bulma/bootstrap
        if (["bulma", "bootstrap"].includes(theme)) {

            // Set Theme to session
            http.session.theme = theme;

        } else {
            // if no query and session exists, we set theme to session value
            if (http.session.theme) {

                theme = http.session.theme

            } else {

                // Get Config {project.theme} else return null
                theme = $.$config.get('project.theme', null);

                // If null we need a config.. we throw error.
                if (theme === null) {
                    throw new Error("{project.theme} config is required! Use bulma/bootstrap")
                }

            }
        }


        /**
         * Return Values we want other methods to get on every request.
         *
         * Imagine writing this in every method because we need them? :)
         */
        return {
            user,
            theme,
        }
    }


    /**
     * Index Page
     *
     * can be static or direct..
     *
     * About Page action is static for test.
     * @param {Xpresser.Http} http - RequestEngine Instance
     * @param user  - Imported form boot method
     * @param template - Imported form boot method
     */
    index(http, {user, theme}) {
        // Return index view in views folder
        return http.view(theme + '/index', {
            user,
        })
    }


    /**
     * About Page
     *
     * A static method also works depending on your preference.
     *
     * @param {Xpresser.Http} http - RequestEngine Instance
     * @param user - Imported from boot method
     * @param theme - Imported from boot method
     */
    static about(http, {user, theme}) {
        /**
         * Set contact details
         *
         * user is imported from the boot method.
         */
        const info = {
            email: user.email,
            company: 'Your Company',
            phone: '+123456789',
            address: "Somewhere on earth, maybe Astro world!"
        };

        return http.view(theme + '/about', {
            user,
            info,
        });
    }
}


module.exports = AppController;
