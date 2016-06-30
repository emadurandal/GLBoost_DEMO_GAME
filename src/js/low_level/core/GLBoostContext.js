import GLContext from './GLContext';
import MutableTexture from '../textures/MutableTexture';
import GLExtensionsManager from './GLExtensionsManager';
import RenderPath from '../../middle_level/expressions/RenderPath';

let singleton = Symbol();
export var singletonEnforcer = Symbol();

export default class GLBoostContext {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLBoostContext(singletonEnforcer);
    }
    return this[singleton];
  }
  

  /**
   * en: create textures as render target. (and attach it to framebuffer object internally.)<br>
   * ja:レンダーターゲットとしてテクスチャを作成します（内部的にframebuffer objectにアタッチされます）。
   * @param {number} width en: width of texture. ja: テクスチャの幅
   * @param {number} height en: height of texture. ja: テクスチャの高さ
   * @param {number} textureNum en: the number of creation. ja:テクスチャを作る個数
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   * @returns {Array} en: an array of created textures. ja:作成されたテクスチャの配列
   */
  createTexturesForRenderTarget(width, height, textureNum, canvas = GLBoost.CURRENT_CANVAS_ID) {
    var glContext = GLContext.getInstance(canvas);
    var gl = glContext.gl;

    var glem = GLExtensionsManager.getInstance(glContext);

    // Create FBO
    var fbo = glContext.createFramebuffer(GLBoostContext.name);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width ? width : canvas.width;
    fbo.height = height ? height : canvas.height;

    var renderTargetTextures = [];
    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(fbo.width, fbo.height);
      texture.fbo = fbo;
      renderTargetTextures.push(texture);
    }

    // Create RenderBuffer
    var renderbuffer = glContext.createRenderbuffer(GLBoostContext.name);
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);

    // Attach Buffers
    renderTargetTextures.forEach((texture, i)=>{
      var glTexture = texture.glTextureResource;
      var attachimentId = glem.colorAttachiment(gl, i);
      texture.colorAttachiment = attachimentId;
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
    });
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return renderTargetTextures;
  }

  createDepthTexturesForRenderTarget(width, height, canvas = GLBoost.CURRENT_CANVAS_ID) {
    var glContext = GLContext.getInstance(canvas);
    var gl = glContext.gl;

    var glem = GLExtensionsManager.getInstance(glContext);

    // Create FBO
    var fbo = glContext.createFramebuffer(GLBoostContext.name);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width ? width : canvas.width;
    fbo.height = height ? height : canvas.height;

    let depthTexture = new MutableTexture(fbo.width, fbo.height, canvas);
    depthTexture.fbo = fbo;

    // Attach Buffers
    var glTexture = depthTexture.glTextureResource;
    var attachimentId = gl.DEPTH_ATTACHMENT;
    depthTexture.colorAttachment = attachimentId;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return depthTexture;
  }

}

GLBoost['GLBoostContext'] = GLBoostContext;
