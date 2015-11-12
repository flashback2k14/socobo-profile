var SocoboProfile = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init(bUrl, uId) {
    /**
     * Firebase Base URL
     */
    var baseUrl = bUrl;

    /**
     * User ID
     */
    var userId = uId;

    /**
     * Load Data from Firebase
     * @returns {Promise}
     */
    function loadProfileData() {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profiles/" + userId);
        ref.on("value", function(snapshot){
          if (snapshot) {
            resolve(snapshot.val());
          } else {
            reject({err: "No Profile Data available!"});
          }
        })
      });
    }

    /**
     * Update Profile Data
     * @param obj Changed Data
     * @returns {Promise}
     */
    function updateProfileData(obj) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profiles/" + userId);
        var onComplete = function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({value: "Update Profile Data was successful!"});
          }
        };
        ref.update(obj, onComplete);
      });
    }

    /**
     * Change User Email Address
     * @param obj Changed Data
     * @returns {Promise}
     */
    function changeUserEmailAddress(obj) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profiles/" + userId);
        var onComplete = function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_PASSWORD":
                reject({value: "The specified user account password is incorrect."});
                break;
              case "INVALID_USER":
                reject({value: "The specified user account does not exist."});
                break;
              default:
                reject({value: "Error creating user: " + error.message});
            }
          } else {
            resolve({value: "User email changed successfully!"});
          }
        };
        ref.changeEmail({oldEmail: obj.oldMail, newEmail: obj.newMail, password: obj.oldPwd}, onComplete);
      });
    }

    /**
     * Change User Password
     * @param obj Changed Data
     * @returns {Promise}
     */
    function changeUserPassword(obj) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profiles/" + userId);
        var onComplete = function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_PASSWORD":
                reject({value: "The specified user account password is incorrect."});
                break;
              case "INVALID_USER":
                reject({value: "The specified user account does not exist."});
                break;
              default:
                reject({value: "Error creating user: " + error.message});
            }
          } else {
            resolve({value: "User password changed successfully!"});
          }
        };
        ref.changePassword({email: obj.oldMail, oldPassword: obj.oldPwd, newPassword: obj.newPwd}, onComplete);
      });
    }

    /**
     * Reset User Password
     * @param obj Email Adress
     * @returns {Promise}
     */
    function resetUserPassword(obj) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profiles/" + userId);
        var onComplete = function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_USER":
                reject({value: "The specified user account does not exist."});
                break;
              default:
                reject({value: "Error creating user: " + error.message});
            }
          } else {
            resolve({value: "User password has been reset successfully!"});
          }
        };
        ref.resetPassword({email: obj.oldMail}, onComplete);
      });
    }

    /**
     * Remove User Account from Firebase
     * @param obj User Login
     * @returns {Promise}
     */
    function removeUserAccount(obj) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(baseUrl + "profiles/" + userId);
        var onComplete = function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_PASSWORD":
                reject({value: "The specified user account password is incorrect."});
                break;
              case "INVALID_USER":
                reject({value: "The specified user account does not exist."});
                break;
              default:
                reject({value: "Error creating user: " + error.message});
            }
          } else {
            resolve({value: "User Account removed successfully!"});
          }
        };
        ref.removeUser({email: obj.oldMail, password: obj.oldPwd}, onComplete);
      });
    }

    /**
     * PUBLIC FUNCTIONS
     */
    return {
      loadProfileData         : loadProfileData,
      updateProfileData       : updateProfileData,
      changeUserEmailAddress  : changeUserEmailAddress,
      changeUserPassword      : changeUserPassword,
      resetUserPassword       : resetUserPassword,
      removeUserAccount       : removeUserAccount
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function(bUrl, uId) {
      if (!instance) {
        instance = init(bUrl, uId);
      }
      return instance;
    }
  };
})();
