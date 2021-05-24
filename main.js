import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// declare variables
let camera, scene, renderer, controls;
let gridHelper,axesHelper,pointLightHelper;
let pointlight, ambientlight;
let geometry,material,cube;

// declare scene constants
const FOV = 75;
const WIDTH = window.innerWidth || 1; 
const HEIGHT = window.innerHeight || 1;
const ASPECT_RATIO = WIDTH / HEIGHT;
const PIXEL_RATIO = window.devicePixelRatio;
const NEAR_CLIP = 0.1;
const FAR_CLIP = 1000;
const DEFAULT_POS = [20,40,60];
const CANVAS = document.querySelector('#bg');
const ENABLE_HELPERS = true;
const GRID_SIZE = 100;
const GRID_DIVISIONS = 25;
const BASE_COLOR = 0xffffff; 
const BACKGROUND_COLOR = new THREE.Color(0x3C3C3C);
const BOX_COLOR = 0x0000AA;
const BOX_SIZE = [5,5,5];
init()

function init(){
  camera = new THREE.PerspectiveCamera(FOV,ASPECT_RATIO,NEAR_CLIP,FAR_CLIP);
  scene = new THREE.Scene();
  scene.background = BACKGROUND_COLOR;

  camera.position.set(...(DEFAULT_POS.map(pos=>pos+15)))
  renderer = new THREE.WebGLRenderer({
    canvas: CANVAS
  });

  renderer.setPixelRatio(PIXEL_RATIO);
  renderer.setSize(WIDTH,HEIGHT);

  pointlight = new THREE.PointLight(BASE_COLOR);
  pointlight.position.set(...(DEFAULT_POS.map(pos=>pos-15)));
  ambientlight = new THREE.AmbientLight(BASE_COLOR);

  geometry = new THREE.BoxGeometry(...BOX_SIZE);
  material = new THREE.MeshPhongMaterial({color:BOX_COLOR});
  cube = new THREE.Mesh(geometry,material);

  controls = new OrbitControls(camera,renderer.domElement);
  gridHelper = new THREE.GridHelper(GRID_SIZE,GRID_DIVISIONS);
  axesHelper = new THREE.AxesHelper(5)
  pointLightHelper = new THREE.PointLightHelper(pointlight,5)

  scene.add(pointlight);
  scene.add(ambientlight);
  scene.add(cube);
  if(ENABLE_HELPERS){
    scene.add(pointlight);
    scene.add(ambientlight)
    scene.add(gridHelper);
    scene.add(axesHelper);
    scene.add(pointLightHelper)
  } 
  animate()
}

function animate(){
  requestAnimationFrame(animate)
  controls.update();
  renderer.render(scene,camera);  
}

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}