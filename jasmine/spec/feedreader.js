/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        //checks for allFeeds to be defined and have content
        it('are defined,', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //checks for allFeeds urls to be defined and have content
        it('feed urls are defined,', function () {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            }
        });

        //checks for allFeeds feed names to be defined and have content
        it('and feed names are defined.', function () {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            }
        });
    });


    describe('The menu', function () {

        //checks for menu to be hidden by default when page loads
        it('is hidden by default.', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //checks for menu to be visible when clicked/toggled while menu is hidden
        it('It toggles to show', function () {
            if ($('body').hasClass('menu-hidden') && ($('.menu-icon-link').trigger('click'))) {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            }
        });

        //checks for menu to be hidden when clicked/toggled while menu is visible
        it('and toggles to hide.', function () {
            if (!$('body').hasClass('menu-hidden') && ($('.menu-icon-link').trigger('click'))) {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            }
        });
    });

    describe('Initial Entries', function () {

        //loads Asynchronous loadFeed() before each it spec 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        //checks for .entry to contain content
        it('has at least a single .entry element within the .feed container.', function () {
            var feedEntryLen = $('.entry').length;
            expect(feedEntryLen > 0).toBe(true);
        });
    });

    describe('New Feed Selection', function () {

        //loads Asynchronous loadFeed() before each it spec 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        //checks that .feed content is updated when new feed is loaded
        it('The content actually changes when a new feed is loaded.', function (done) {
            var feed2, feed1 = $('.feed').text(); //creates feed variables, populates feed1 with current feed
            loadFeed(1, function () { //load new feed
                var feed2 = $('.feed').text(); //populate feed2 with new feed
                done();
            });
            expect(feed1).not.toEqual(feed2);
        });
    });
}());