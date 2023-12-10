import * as THREE from "three";

interface CardOptions {
  width: number;
  height: number;
  radius: number;
  color: string;
}

class Card {
  mesh: THREE.Mesh;
  constructor({ width, height, radius, color }: CardOptions) {
    const shape = new THREE.Shape();
    const x = width * 0.5 - radius;
    const y = height * 0.5 - radius;
    shape
      .absarc(x, y, radius, 0, Math.PI * 0.5)
      .absarc(-x, y, radius, Math.PI * 0.5, Math.PI)
      .absarc(-x, -y, radius, Math.PI, -Math.PI * 0.5)
      .absarc(x, -y, radius, -Math.PI * 0.5, 0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.01,
      bevelThickness: 0.1,
    });
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.mesh = mesh;
  }
}

export default Card;
