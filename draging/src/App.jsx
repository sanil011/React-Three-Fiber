import { useEffect, useState } from 'react';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GUI } from 'dat.gui';

import SceneInit from './lib/SceneInit';

function App() {

  let scene = undefined;
  let camera = undefined;
  let renderer = undefined;

  // NOTE: Camera params;
  let fov = 45;
  let nearPlane = 1;
  let farPlane = 1000;
  let canvasId = "myThreeJsCanvas";

  // NOTE: Additional components.
  let clock = undefined;
  let stats = undefined;
  let controls = undefined;

  // NOTE: Lighting is basically required.
  let spotLight = undefined;
  let ambientLight = undefined;
  function initialize() {
     scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 16;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(canvasId);
    renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // enable for shadows
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    controls = new OrbitControls(camera, renderer.domElement);
    stats = Stats();
    document.body.appendChild(stats.dom);

    // HIDE LIGHTING FOR DEMO.
    // ambient light which is for the whole scene
    // this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // this.ambientLight.castShadow = true;
    // this.scene.add(this.ambientLight);
    // spot light which is illuminating the chart directly
    // this.spotLight = new THREE.SpotLight(0xffffff, 1);
    // this.spotLight.castShadow = true;
    // this.spotLight.position.set(0, 64, 32);
    // this.scene.add(this.spotLight);

    // if window resizes
    window.addEventListener('resize', () => onWindowResize(), false);

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  

  function render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  // animate();
  useEffect(() => {
    // const test = new SceneInit('myThreeJsCanvas');
    function animate() {
      // NOTE: Window is implied.
      // requestAnimationFrame(this.animate.bind(this));
      dragObject()
      renderer.render(scene, camera)
      stats.update();
      window.requestAnimationFrame(animate);
      controls.update();
    }
    initialize();
   
    // initialize gui
    const gui = new GUI();

    // main group
    // const mainGroup = new THREE.Group();
    // mainGroup.position.y = 0.5;
    // scene.add(mainGroup);

    // normal box
    // const bg0 = new THREE.BoxGeometry(1, 1, 1);
    // const bm0 = new THREE.MeshNormalMaterial();
    // const boxMesh0 = new THREE.Mesh(bg0, bm0);
    // test.scene.add(boxMesh0);

    // set up ground
    const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    scene.add(groundMesh);
    groundMesh.userData.ground = true;

    // set up torus for youtube thumbnail
    // const bg1 = new THREE.TorusGeometry(1.5, 0.75, 64, 64);
    // const bm1 = new THREE.MeshNormalMaterial({ color: 0xff0000 });
    // const boxMesh1 = new THREE.Mesh(bg1, bm1);
    // boxMesh1.castShadow = true;
    // boxMesh1.position.y = 1;
    // boxMesh1.position.z = 1;
    // boxMesh1.rotation.x = -Math.PI / 3;
    // mainGroup.add(boxMesh1);

    // set up red box mesh
    const bg1 = new THREE.BoxGeometry(1, 1, 1);
    const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(bg1, bm1);
    boxMesh1.castShadow = true;
    boxMesh1.position.x = -2;
    scene.add(boxMesh1);
    boxMesh1.userData.draggable = true;
    boxMesh1.userData.name = 'BOX1';


    // set up green box mesh
    const bg2 = new THREE.BoxGeometry(1, 1, 1);
    const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh2 = new THREE.Mesh(bg2, bm2);
    boxMesh2.castShadow = true;
    boxMesh2.position.x = 0;
    scene.add(boxMesh2);
    boxMesh2.userData.draggable = true;
    boxMesh2.userData.name = 'BOX2';


    // set up blue box mesh
    const bg3 = new THREE.BoxGeometry(1, 1, 1);
    const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const boxMesh3 = new THREE.Mesh(bg3, bm3);
    boxMesh3.castShadow = true;
    boxMesh3.position.x = 2;
    scene.add(boxMesh3);
    boxMesh3.userData.draggable = true;
    boxMesh3.userData.name = 'BOX3';


    // set up ambient light
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(al);

    // set up ambient light gui
    const alFolder = gui.addFolder('ambient light');
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, 'visible');
    alFolder.add(al, 'intensity', 0, 1, 0.1);
    alFolder
      .addColor(alSettings, 'color')
      .onChange((value) => al.color.set(value));
    alFolder.open();

    // setup directional light + helper
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    // use this for YouTube thumbnail
    dl.position.set(0, 2, 2);
    // dl.position.set(0, 2, 0);
    dl.castShadow = true;
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    scene.add(dl);
    // mainGroup.add(dlHelper);

    // set up directional light gui
    const dlSettings = {
      visible: true,
      color: dl.color.getHex(),
    };
    const dlFolder = gui.addFolder('directional light');
    dlFolder.add(dlSettings, 'visible').onChange((value) => {
      dl.visible = value;
      dlHelper.visible = value;
    });
    dlFolder.add(dl, 'intensity', 0, 1, 0.25);
    dlFolder.add(dl.position, 'y', 1, 4, 0.5);
    dlFolder.add(dl, 'castShadow');
    dlFolder
      .addColor(dlSettings, 'color')
      .onChange((value) => dl.color.set(value));
    dlFolder.open();

    // set up spot light + helper
    const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
    sl.position.set(0, 2, 2);
    const slHelper = new THREE.SpotLightHelper(sl);
    scene.add(sl, slHelper);

    // set up spot light gui
    const slSettings = {
      visible: true,
    };
    const slFolder = gui.addFolder('spot light');
    slFolder.add(slSettings, 'visible').onChange((value) => {
      sl.visible = value;
      slHelper.visible = value;
    });
    slFolder.add(sl, 'intensity', 0, 4, 0.5);
    slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
    slFolder.add(sl, 'castShadow');
    slFolder.open();

    const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
    pl.position.set(2, 2, 2);
    const plHelper = new THREE.PointLightHelper(pl, 0.5);
    scene.add(pl, plHelper);
    pl.userData.draggable = true;
    pl.userData.name = 'pl';
    plHelper.userData.draggable = true;
    plHelper.userData.name = 'pl';

    // set up point light gui
    const plSettings = {
      visible: true,
      color: pl.color.getHex(),
    };
    const plFolder = gui.addFolder('point light');
    plFolder.add(plSettings, 'visible').onChange((value) => {
      pl.visible = value;
      plHelper.visible = value;
    });
    plFolder.add(pl, 'intensity', 0, 2, 0.25);
    plFolder.add(pl.position, 'x', -2, 4, 0.5);
    plFolder.add(pl.position, 'y', -2, 4, 0.5);
    plFolder.add(pl.position, 'z', -2, 4, 0.5);
    plFolder.add(pl, 'castShadow');
    plFolder
      .addColor(plSettings, 'color')
      .onChange((value) => pl.color.set(value));
    plFolder.open();
   
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();
    const moveMouse = new THREE.Vector2();

    let draggable;
    function intersect(pos) {
      raycaster.setFromCamera(pos, camera);
      return raycaster.intersectObjects(scene.children);
    }

    window.addEventListener("click", (event) => {

      if (draggable != null) {
        console.log(`dropping draggable ${draggable.userData.name}`)
        draggable = null 
        return;
      }

      clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const found = intersect(clickMouse);

      if (found.length > 0 && found[0].object.userData.draggable) {
        draggable = found[0].object;
        console.log("found", draggable.userData.name)
      }
    })

    window.addEventListener('mousemove', event => {
      moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function dragObject() {
      if (draggable != null) {
        const found = intersect(moveMouse);
        if (found.length > 0) {
          for (let i = 0; i < found.length; i++) {
            if (!found[i].object.userData.ground)
              continue

            let target = found[i].point;
            draggable.position.x = target.x
            draggable.position.z = target.z
          }
        }
      }
    }
    animate()
    // Destroy the GUI on reload to prevent multiple stale UI from being displayed on screen.
    return () => {
      gui.destroy();
    };
  }, []);



  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
