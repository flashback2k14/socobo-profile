var Util = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init(context) {
    var ctx = context;

    /**
     * HELPER FUNCTION PASSWORD CHECK
     */
    /**
     * Check if Passwords are matching
     * @param oldPwd old Password
     * @param newPwd new Password
     * @return {Boolean}
     * @private
     */
    function arePasswordsMatching(oldPwd, newPwd) {
      return (oldPwd.length >= 8 && newPwd >= 8) && oldPwd.match(newPwd);
    }

    /**
     * HELPER FUNCTIONS PROFILE SECTION
     */
    /**
     * Toggle specific Profile Section to Edit or Show Information
     * @param e FAB
     * @private
     */
    function toggleInformationArea(e) {
      if (e.currentTarget.id === "fabEditInfoStandard") {
        _toggleInformationItem(ctx.$.showInfoStandard, "show-info", "edit-info");
        _toggleInformationItem(ctx.$.editInfoStandard, "show-info", "edit-info");
      } else {
        _toggleInformationItem(ctx.$.showInfoBio, "show-info", "edit-info");
        _toggleInformationItem(ctx.$.editInfoBio, "show-info", "edit-info");
      }
    }

    /**
     * Toggle specific Profile Section
     * @param element Info Container
     * @param showCssClass CSS Class to show an Element
     * @param hideCssClass CSS Class to hide an Element
     * @private
     */
    function _toggleInformationItem(element, showCssClass, hideCssClass) {
      if (element.classList.contains(showCssClass)) {
        _hideElement(element, showCssClass, hideCssClass);
      } else {
        _showElement(element, showCssClass, hideCssClass);
      }
    }

    /**
     * HELPER FUNCTIONS ADMINISTRATION SECTION
     */
    /**
     * Toggle right Admin Container to show specific Input Fields
     * @param e Button
     * @private
     */
    function toggleRightAdminContainerElements(e) {
      var container = document.querySelector("#rightAdminContainer");
      var iOldEmailAddress = document.querySelector("#txtOldEmailAddress");
      var iNewEmailAddress = document.querySelector("#txtNewEmailAddress");
      var iOldPassword = document.querySelector("#txtOldPassword");
      var iNewPassword = document.querySelector("#txtNewPassword");
      var button = e.currentTarget.id;

      if (container.classList.contains("hide-right-admin-container")) {
        _showElement(container, "show-right-admin-container", "hide-right-admin-container");

        switch (button) {
          case "btnChangeEmailAddress":
            if (!_isElementShown(iOldEmailAddress)) {
              _showElement(iOldEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (!_isElementShown(iNewEmailAddress)) {
              _showElement(iNewEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (!_isElementShown(iOldPassword)) {
              _showElement(iOldPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iNewPassword)) {
              _hideElement(iNewPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            return "ChangeEmailAddress";

          case "btnChangePassword":
            if (!_isElementShown(iOldEmailAddress)) {
              _showElement(iOldEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iNewEmailAddress)) {
              _hideElement(iNewEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (!_isElementShown(iOldPassword)) {
              _showElement(iOldPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            if (!_isElementShown(iNewPassword)) {
              _showElement(iNewPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            return "ChangePassword";

          case "btnResetPassword":
            if (!_isElementShown(iOldEmailAddress)) {
              _showElement(iOldEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iNewEmailAddress)) {
              _hideElement(iNewEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iOldPassword)) {
              _hideElement(iOldPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iNewPassword)) {
              _hideElement(iNewPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            return "ResetPassword";

          case "btnDeleteAccount":
            if (!_isElementShown(iOldEmailAddress)) {
              _showElement(iOldEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iNewEmailAddress)) {
              _hideElement(iNewEmailAddress, "show-right-admin-container", "hide-right-admin-container");
            }
            if (!_isElementShown(iOldPassword)) {
              _showElement(iOldPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            if (_isElementShown(iNewPassword)) {
              _hideElement(iNewPassword, "show-right-admin-container", "hide-right-admin-container");
            }
            return "DeleteAccount";
        }
      } else {
        _hideElement(container, "show-right-admin-container", "hide-right-admin-container");
        return "";
      }
    }

    /**
     * Check if an Element is shown
     * @param element Input Field
     * @return {boolean}
     * @private
     */
    function _isElementShown(element) {
      return element.classList.contains("show-right-admin-container");
    }

    /**
     * Show an Element
     * @param element Element
     * @param showCssClass CSS Class to show an Element
     * @param hideCssClass CSS Class to hide an Element
     * @private
     */
    function _showElement(element, showCssClass, hideCssClass) {
      element.classList.remove(hideCssClass);
      element.classList.add(showCssClass);
    }

    /**
     * Hide an Element
     * @param element Element
     * @param showCssClass CSS Class to show an Element
     * @param hideCssClass CSS Class to hide an Element
     * @private
     */
    function _hideElement(element, showCssClass, hideCssClass) {
      element.classList.remove(showCssClass);
      element.classList.add(hideCssClass);
    }

    /**
     * show info toast
     * @param toast
     * @param text
     * @param bgColor
     * @param color
     */
    function showToast(toast, text, bgColor, color) {
      toast.text = text;
      toast.style.background = bgColor;
      toast.style.color = color;
      toast.toggle();
    }

    /**
     * PUBLIC FUNCTIONS
     */
    return {
      arePasswordsMatching              : arePasswordsMatching,
      toggleInformationArea             : toggleInformationArea,
      toggleRightAdminContainerElements : toggleRightAdminContainerElements,
      showToast                         : showToast
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function(context) {
      if (!instance) {
        instance = init(context);
      }
      return instance;
    }
  };
})();
