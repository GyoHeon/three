import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import Card from "./Card";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 25);

  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.rotateSpeed = 0.75;
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle = Math.PI * 0.75;

  const card = new Card({
    width: 10,
    height: 15.8,
    radius: 0.5,
    color: "#0077ff",
  });
  card.mesh.rotation.z = Math.PI * 0.05;

  scene.add(card.mesh);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.position.set(4, 4, 4);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff);
  const directionalLight2 = directionalLight1.clone();

  directionalLight1.position.set(1, 1, 3);
  directionalLight2.position.set(-1, 1, -3);
  scene.add(directionalLight1, directionalLight2);

  renderAnimation();

  function renderAnimation() {
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(renderAnimation);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
