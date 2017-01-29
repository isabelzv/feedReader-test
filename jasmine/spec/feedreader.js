/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each object has valid url', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            };
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each object has valid name', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            };
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // get all the classes in the document.body elem and check
            // to see if menu-hidden is there.
            expect(document.body.classList).toContain('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it ('toggles menu on click', function() {
            // trigger click event on menu-icon-link
            $('.menu-icon-link').click();
            // check to see if body elem contains menu-hidden class
            expect($('body')).not.toContain('.menu-hidden');

            $('.menu-icon-link').click();
            expect(document.body.classList).toContain('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // set up beforeEach for use with other tests in suite
        // pass in done, so test will only be exected on completion
        // of before each function.
        beforeEach(function(done) {
            // call loadFeed with allFeeds[0]
            loadFeed(0, function() {
                // call done so that function knows to move on to test.
                done();
            })
        })

        it('loadFeed results in at least 1 .entry elem within the .feed container', function(done){
            // use jQuery to grab array of elems with class entry within elem of class feed.
            // get length and check it's not 0.
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // initialize variables so they can be set in beforeEach and used in test
        var initialFeed, newFeed;

        // pass in done, so code within beforeEach finishes loading before test function is called.
        beforeEach(function(done) {
            // call loadFeed with allFeeds[0]
            loadFeed(0, function() {
                // set initalFeed to whatever html of elem with class feed is.
                initialFeed = $('.feed').html();
                // call loadFeed again, this time with different allFeeds index
                loadFeed(1, function() {
                    // set newFeed to html
                    newFeed = $('.feed').html();
                    done();
                })
            });
        })

        it('loadFeed results in content change', function(done) {
            // check that the html of the initial and new elems with class feed were different.
            expect(initialFeed).not.toEqual(newFeed);
            done();
        });
    });
}());
