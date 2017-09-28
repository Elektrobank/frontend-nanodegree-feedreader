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
        it('are defined,', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('feed urls are defined,', function () {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            }
        });


        it('and feed names are defined.', function () {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            }
        });
    });


    describe('The menu', function () {

        it('is hidden by default.', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('It toggles to show', function () {
            if ($('body').hasClass('menu-hidden') && ($('.menu-icon-link').trigger('click'))) {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            }
        });

        it('and toggles to hide.', function () {
            if (!$('body').hasClass('menu-hidden') && ($('.menu-icon-link').trigger('click'))) {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            }
        });
    });

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('has at least a single .entry element within the .feed container.', function () {
            var feedEntryLen = $('.entry').length;
            expect(feedEntryLen > 0).toBe(true);
        });
    });

    describe('New Feed Selection', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('The content actually changes when a new feed is loaded.', function (done) {
            var feed2, feed1 = $('.feed').text();
            loadFeed(1, function () {
                var feed2 = $('.feed').text();
                done();
            });
            expect(feed1).not.toEqual(feed2);
        });
    });
}());