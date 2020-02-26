var fetchPosts = require("./model");
var sampleData = require("./sampleData");

describe('Testing calls to Hatchways API', () => {
    beforeEach(() => {
      fetch.resetMocks()
    })

  it('should fetch all posts tagged with health', done => {
    const resp = JSON.stringify({posts: sampleData.healthPosts});

    fetch.mockResponseOnce(resp)
    var req = {query: {tags: 'health'}}
    function callback(data) {
      try {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data.length).toEqual(5);
        done();
      } catch (error) {
        done(error);
      }
    }
    fetchPosts(req, callback);
    })

    it('should sort all posts tagged with science by likes in [default] ascending order', done => {
      const resp = JSON.stringify({posts: sampleData.sciencePosts});

      fetch.mockResponseOnce(resp)
      var req = {query: {tags: 'science', sortBy: 'likes'}}
      function callback(data) {
        try {
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(data[0].likes).toBeLessThan(data[1].likes);
          expect(data[3].likes).toBeLessThan(data[4].likes);
          done();
        } catch (error) {
          done(error);
        }
      }
      fetchPosts(req, callback);
      })

      it('should sort all posts tagged with tech by reads in descending order', done => {
        const resp = JSON.stringify({posts: sampleData.techPosts});
        fetch.mockResponseOnce(resp)
        var req = {query: {tags: 'tech', sortBy: 'reads', direction: 'desc'}}
        function callback(data) {
          try {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(data[1].reads).toBeLessThan(data[0].reads);
            expect(data[4].reads).toBeLessThan(data[3].reads);
            done();
          } catch (error) {
            done(error);
          }
        }
        fetchPosts(req, callback);
        })

            it('should sort all posts tagged with science by likes in [default] ascending order', done => {
      const resp = JSON.stringify({posts: sampleData.sciencePosts});
      fetch.mockResponseOnce(resp)
      var req = {query: {tags: 'science', sortBy: 'likes'}}
      function callback(data) {
        try {
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(data[0].likes).toBeLessThan(data[1].likes);
          expect(data[3].likes).toBeLessThan(data[4].likes);
          done();
        } catch (error) {
          done(error);
        }
      }
      fetchPosts(req, callback);
      })

      it('should sort all posts tagged with tech by reads in descending order', done => {
        const resp = JSON.stringify({posts: sampleData.techPosts});
        fetch.mockResponseOnce(resp)
        var req = {query: {tags: 'tech', sortBy: 'reads', direction: 'desc'}}
        function callback(data) {
          try {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(data[1].reads).toBeLessThan(data[0].reads);
            expect(data[4].reads).toBeLessThan(data[3].reads);
            done();
          } catch (error) {
            done(error);
          }
        }
        fetchPosts(req, callback);
        })

        it('should return results from 3 lists without duplicates', done => {
          const resp1 = JSON.stringify({posts: sampleData.techPosts});
          const resp2 = JSON.stringify({posts: sampleData.sciencePosts});
          const resp3 = JSON.stringify({posts: sampleData.healthPosts});
          fetch.once(resp1).once(resp2).once(resp3);
          var req = {query: {tags: 'tech,science,health'}}
          function callback(data) {
            try {
              expect(fetch).toHaveBeenCalledTimes(3);
              expect(data.length).toEqual(11);
              done();
            } catch (error) {
              done(error);
            }
          }
          fetchPosts(req, callback);
          })
  })


