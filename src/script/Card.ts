import * as THREE from "three";

interface CardOptions {
  width: number;
  height: number;
  radius: number;
  color: string;
  roughness?: number;
  metalness?: number;
}

class Card {
  mesh: THREE.Mesh;
  constructor({
    width,
    height,
    radius,
    color,
    roughness = 0.5,
    metalness = 0.5,
  }: CardOptions) {
    const shape = new THREE.Shape();
    const x = width * 0.5 - radius;
    const y = height * 0.5 - radius;
    shape
      .absarc(x, y, radius, 0, Math.PI * 0.5)
      .absarc(-x, y, radius, Math.PI * 0.5, Math.PI)
      .absarc(-x, -y, radius, Math.PI, -Math.PI * 0.5)
      .absarc(x, -y, radius, -Math.PI * 0.5, 0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.009,
      bevelThickness: 0.1,
    });
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness,
      metalness,
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.mesh = mesh;
  }
}

export default Card;

class TossCard {
  mesh: THREE.Group;
  constructor({
    width,
    height,
    radius,
    color,
    roughness = 0.5,
    metalness = 0.5,
  }: CardOptions) {
    const x = width * 0.5 - radius;
    const y = height * 0.5 - radius;
    const depth = 1.5;

    const frontShape = new THREE.Shape();

    frontShape
      .absarc(x, y, radius, 0, Math.PI * 0.5)
      .absarc(-x, y, radius, Math.PI * 0.5, Math.PI)
      .absarc(-x, -y, radius, Math.PI, -Math.PI * 0.5)
      .absarc(-radius * 6.5, -y, radius, -Math.PI * 0.5, -Math.PI * 0.4)
      .absarc(
        -radius * 4,
        -y - radius,
        radius,
        Math.PI * 0.6,
        Math.PI * 0.4,
        true
      )
      .absarc(-radius * 1.5, -y, radius, -Math.PI * 0.6, -Math.PI * 0.5)
      .absarc(x, -y, radius, -Math.PI * 0.5, 0);

    const frontGeometry = new THREE.ShapeGeometry(frontShape).translate(
      0,
      0,
      3
    );
    const frontMaterial = new THREE.MeshStandardMaterial({
      color,
      side: THREE.FrontSide,
      roughness,
      metalness,
    });
    const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial).translateZ(
      1
    );

    const backShape = new THREE.Shape();
    backShape
      .absarc(x, y, radius, 0, Math.PI * 0.5)
      .absarc(-x, y, radius, Math.PI * 0.5, Math.PI)
      .absarc(-x, -y, radius, Math.PI, -Math.PI * 0.5)
      .absarc(-radius * 6.5, -y, radius, -Math.PI * 0.5, -Math.PI * 0.4)
      .absarc(
        -radius * 4,
        -y - radius,
        radius,
        Math.PI * 0.6,
        Math.PI * 0.4,
        true
      )
      .absarc(-radius * 1.5, -y, radius, -Math.PI * 0.6, -Math.PI * 0.5)
      .absarc(x, -y, radius, -Math.PI * 0.5, 0);
    const backGeometry = new THREE.ShapeGeometry(backShape);
    const backMaterial = new THREE.MeshStandardMaterial({
      color: "#1e90ff",
      side: THREE.BackSide,
      roughness,
      metalness,
    });
    const backMesh = new THREE.Mesh(backGeometry, backMaterial).translateZ(-1);

    const midRT = new THREE.CylinderGeometry(
      5,
      5,
      5,
      20,
      20,
      true,
      0,
      Math.PI * 0.5
    )
      .rotateZ(Math.PI * 0.5)
      .rotateY(Math.PI * 0.5)
      .translate(45, 74, 1.5);
    const midLT = new THREE.CylinderGeometry(
      5,
      5,
      5,
      20,
      20,
      true,
      Math.PI * 0.5,
      Math.PI * 0.5
    )
      .rotateZ(Math.PI * 0.5)
      .rotateY(Math.PI * 0.5)
      .translate(-45, 74, 1.5);
    const midLB = new THREE.CylinderGeometry(
      5,
      5,
      5,
      20,
      20,
      true,
      -Math.PI,
      Math.PI * 0.5
    )
      .rotateZ(Math.PI * 0.5)
      .rotateY(Math.PI * 0.5)
      .translate(-45, -74, 1.5);
    const midRB = new THREE.CylinderGeometry(
      5,
      5,
      5,
      20,
      20,
      true,
      -Math.PI * 0.5,
      Math.PI * 0.5
    )
      .rotateZ(Math.PI * 0.5)
      .rotateY(Math.PI * 0.5)
      .translate(45, -74, 1.5);
    const midMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      side: THREE.FrontSide,
      roughness,
      metalness,
    });
    const midRTMesh = new THREE.Mesh(midRT, midMaterial);
    const midLTMesh = new THREE.Mesh(midLT, midMaterial);
    const midLBMesh = new THREE.Mesh(midLB, midMaterial);
    const midRBMesh = new THREE.Mesh(midRB, midMaterial);

    const midT = new THREE.PlaneGeometry(90, 5)
      .rotateX(-Math.PI * 0.5)
      .translate(0, 79, 1.5);
    const midB = new THREE.PlaneGeometry(90, 5)
      .rotateX(Math.PI * 0.5)
      .translate(0, -79, 1.5);
    const midL = new THREE.PlaneGeometry(5, 148)
      .rotateY(-Math.PI * 0.5)
      .translate(-50, 0, 1.5);
    const midR = new THREE.PlaneGeometry(5, 148)
      .rotateY(Math.PI * 0.5)
      .translate(50, 0, 1.5);
    const midTMesh = new THREE.Mesh(midT, midMaterial);
    const midBMesh = new THREE.Mesh(midB, midMaterial);
    const midLMesh = new THREE.Mesh(midL, midMaterial);
    const midRMesh = new THREE.Mesh(midR, midMaterial);

    const midGroup = new THREE.Group().add(
      midRTMesh,
      midLTMesh,
      midLBMesh,
      midRBMesh,
      midTMesh,
      midBMesh,
      midLMesh,
      midRMesh
    );

    const mesh = new THREE.Group().add(frontMesh, backMesh, midGroup);

    this.mesh = mesh;
  }
}

export { TossCard };
