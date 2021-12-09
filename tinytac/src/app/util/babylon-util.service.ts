import { Injectable } from '@angular/core';
import { Color3, DynamicTexture, Mesh, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';

@Injectable({
  providedIn: 'root'
})
export class BabylonUtilService {
  constructor() {}

  /**
   * Source: https://doc.babylonjs.com/snippets/world_axes
   * @param size number
   */
  showWorldAxis(scene: Scene, size: number) {
    const axisX = Mesh.CreateLines(
      'axisX',
      [
        Vector3.Zero(),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, -0.05 * size, 0)
      ],
      scene
    );

    axisX.color = new Color3(1, 0, 0);
    const xChar = this.makeTextPlane(scene, 'X', 'red', size / 10);
    xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = Mesh.CreateLines(
      'axisY',
      [
        Vector3.Zero(),
        new Vector3(0, size, 0),
        new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0),
        new Vector3(0.05 * size, size * 0.95, 0)
      ],
      scene
    );

    axisY.color = new Color3(0, 1, 0);
    const yChar = this.makeTextPlane(scene, 'Y', 'green', size / 10);
    yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

    const axisZ = Mesh.CreateLines(
      'axisZ',
      [
        Vector3.Zero(),
        new Vector3(0, 0, size),
        new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size),
        new Vector3(0, 0.05 * size, size * 0.95)
      ],
      scene
    );

    axisZ.color = new Color3(0, 0, 1);
    const zChar = this.makeTextPlane(scene, 'Z', 'blue', size / 10);
    zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
  }

  makeTextPlane(scene: Scene, text: string, color: string, textSize: number) {
    const dynamicTexture = new DynamicTexture('DynamicTexture', 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
    const plane = Mesh.CreatePlane('TextPlane', textSize, scene, true);
    const material = new StandardMaterial('TextPlaneMaterial', scene);
    material.backFaceCulling = false;
    material.specularColor = new Color3(0, 0, 0);
    material.diffuseTexture = dynamicTexture;
    plane.material = material;

    return plane;
  }
}
