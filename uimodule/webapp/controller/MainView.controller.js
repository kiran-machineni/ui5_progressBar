sap.ui.define(
  ["com/sap/progressBar/controller/BaseController", "sap/ui/core/Fragment"],
  function (Controller, Fragment) {
    "use strict";

    return Controller.extend("com.sap.progressBar.controller.MainView", {
      onInit: function () {
        var progressIndicator = new sap.m.ProgressIndicator({
          state: "Success",
          percentValue: 1,
          showValue: true,
        });
        var that = this;
        var oView = this.getView();
        if (!this.byId("progressDialog")) {
          Fragment.load({
            id: oView.getId(),
            name: "com.sap.progressBar.view.progress",
            controller: this,
          })
            .then(function (progressDialog) {
              oView.addDependent(progressDialog);
              progressDialog.setEscapeHandler(that.onEscapeHandle);
              that.getView().byId("progressBarBox").addItem(progressIndicator);
              var progressDialog = that.byId("progressDialog");
              progressDialog.open();
            })
            .then(function (progressDialog) {
              for (var i = 1; i <= 10; i++) {
                that.delay(i, progressDialog, progressIndicator);
              }
            });
        } else {
          progressDialog.open();
        }
      },

      delay: function (i, progressDialog, progressIndicator) {
        setInterval(function () {
          if (i == 10) {
            progressIndicator.setVisible(false);
            progressIndicator.destroy(true);
            progressDialog.close();
            progressDialog.destroy(true);
          }
          progressIndicator.setPercentValue(i);
          progressIndicator.setDisplayValue(i + " of " + "10");
        }, 2000 * i);
      },

      onEscapeHandle: function (oPromise) {
        oPromise.reject();
      },
    });
  }
);
