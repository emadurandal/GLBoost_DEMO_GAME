/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	window.onload = function () {
	    var arg = new Object;
	    var pair = location.search.substring(1).split('&');
	    for (var i = 0; pair[i]; i++) {
	        var kv = pair[i].split('=');
	        arg[kv[0]] = kv[1];
	    }
	    GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;
	    var canvas = document.getElementById("world");
	    var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
	    var renderer = glBoostContext.createRenderer({ clearColor: { red: 1.0, green: 0.5, blue: 0.5, alpha: 1 } });
	    var scene = glBoostContext.createScene();
	    var material = glBoostContext.createClassicMaterial();
	    var texture = glBoostContext.createTexture('resources/texture.png');
	    material.diffuseTexture = texture;
	    var planeGeometry = glBoostContext.createPlane(10, 10, 10, 10, null);
	    var plane = glBoostContext.createMesh(planeGeometry, material);
	    scene.addChild(plane);
	    var cubeGeometry = glBoostContext.createCube(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector4(1, 1, 1, 1));
	    var cube = glBoostContext.createMesh(cubeGeometry, material);
	    cube.translate = new GLBoost.Vector3(0, 2, 0);
	    scene.addChild(cube);
	    var camera = glBoostContext.createPerspectiveCamera({
	        eye: new GLBoost.Vector3(0.0, 5, 15.0),
	        center: new GLBoost.Vector3(0.0, 5.0, 0.0),
	        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
	    }, {
	        fovy: 45.0,
	        aspect: 1.0,
	        zNear: 0.1,
	        zFar: 300.0
	    });
	    scene.addChild(camera);
	    var expression = glBoostContext.createExpressionAndRenderPasses(1);
	    expression.renderPasses[0].scene = scene;
	    expression.prepareToRender();
	    var render = function () {
	        renderer.clearCanvas();
	        renderer.draw(expression);
	        var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
	        var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
	        camera.eye = rotatedVector;
	        requestAnimationFrame(render);
	    };
	    render();
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle-dev.js.map