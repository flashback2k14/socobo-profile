var SocoboProfile = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init(context, bUrl, uId) {
    var ctx = context;
    var baseUrl = bUrl;
    var userId = uId;

    function loadProfileData() {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profile/" + userId);
        ref.on("on", function(snapshot){
          if (snapshot) {
            resolve(snapshot);
          } else {
            reject({err: "No Profile Data available!"});
          }
        })
      });
    }

    /**
     * PUBLIC FUNCTIONS
     */
    return {
      loadProfileData   : loadProfileData
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function(context, bUrl, uId) {
      if (!instance) {
        instance = init(context, bUrl, uId);
      }
      return instance;
    }
  };
})();
