
declare var GLBoost:any;

interface Window {
  mesh:any;
}

window.onload = function()
{
  var arg:any = new Object;
  var pair = location.search.substring(1).split('&');
  for(var i = 0; pair[i] ; i++) {
    var kv = pair[i].split('=');
    arg[kv[0]] = kv[1];
  }

  GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

  var canvas = document.getElementById("world");

  var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

  var renderer = glBoostContext.createRenderer({ clearColor: {red:1.0, green:0.5, blue:0.5, alpha:1}});

  var scene = glBoostContext.createScene();



  var material = glBoostContext.createClassicMaterial();
  var texture = glBoostContext.createTexture('resources/texture.png');
  material.diffuseTexture = texture;

  var planeGeometry = glBoostContext.createPlane(10, 10, 10, 10, null);
  var plane = glBoostContext.createMesh(planeGeometry, material);
  scene.addChild( plane );

  var cubeGeometry = glBoostContext.createCube(new GLBoost.Vector3(1,1,1), new GLBoost.Vector4(1,1,1,1));
  var cube = glBoostContext.createMesh(cubeGeometry, material);
  cube.translate = new GLBoost.Vector3(0,2,0);
  scene.addChild( cube );

  var camera = glBoostContext.createPerspectiveCamera(
    {
      eye: new GLBoost.Vector3(0.0, 5, 15.0),
      center: new GLBoost.Vector3(0.0, 5.0, 0.0),
      up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    },
    {
      fovy: 45.0,
      aspect: 1.0,
      zNear: 0.1,
      zFar: 300.0
    }
  );
  scene.addChild( camera );

  var expression = glBoostContext.createExpressionAndRenderPasses(1);
  expression.renderPasses[0].scene = scene;
  expression.prepareToRender();

  var render = function(){
    renderer.clearCanvas();
    renderer.draw(expression);

    var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
    var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    requestAnimationFrame(render);
  };
  render();
};
