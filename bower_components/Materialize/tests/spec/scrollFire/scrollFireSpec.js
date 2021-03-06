describe('ScrollFire Plugin', function() {
  var options, testElement;

  beforeEach(function() {
    options = [{
      selector: '#chat',
      offset: 50,
      callback: 'Materialize.callbackFunc()'
    }];
    Materialize.callbackFunc = function() {
      return 'I have been called';
    };

    loadFixtures('scrollFire/scrollFireFixture.html');
    spyOn(Materialize, 'callbackFunc').and.callThrough();
    testElement = $('#chat');
    Materialize.scrollFire(options);
  });

  describe('ScrollFire', function() {
    it('should fire the callback function', function(done) {
      // Scroll to the chat component
      window.scrollTo(0, testElement.offset().top);
      // The callback function should be fired after scrolling
      setTimeout(function() {
        expect(Materialize.callbackFunc).toHaveBeenCalled();
        done();
      }, 400);
    });
  });
});
