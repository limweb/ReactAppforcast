(function() {
  var Program = {};
  Program["Main"] = function(module, exports) {
    var Main = function() {
      console.log("Hello World");
    };

    module.exports = Main;
  };
  if (typeof module !== 'undefined') {
    module.exports = AS3JS.load({
      program: Program,
      entry: "Main",
      entryMode: "instance"
    });
  } else if (typeof window !== 'undefined' && typeof AS3JS !== 'undefined') {
    window['Main'] = AS3JS.load({
      program: Program,
      entry: "Main",
      entryMode: "instance"
    });
  }
})();