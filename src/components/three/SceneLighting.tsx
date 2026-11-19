import * as THREE from "three";

export function setupSceneLighting(scene: THREE.Scene) {
  // Key Light (warm studio white)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  // Fill Light (soft cool industrial gray)
  const fillLight = new THREE.DirectionalLight(0xd4d4d8, 1.2);
  fillLight.position.set(-6, -2, -4);
  scene.add(fillLight);

  // Signature Electric Green Rim Light (#A3E635)
  const rimLight = new THREE.DirectionalLight(0xa3e635, 3.0);
  rimLight.position.set(-5, 6, -5);
  scene.add(rimLight);

  // Deep Green Low Ambient (#293A22)
  const ambientLight = new THREE.AmbientLight(0x293a22, 1.5);
  scene.add(ambientLight);

  // Bottom bounce light
  const bounceLight = new THREE.DirectionalLight(0x171a17, 1.0);
  bounceLight.position.set(0, -5, 0);
  scene.add(bounceLight);

  return { keyLight, fillLight, rimLight, ambientLight };
}
