import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import { AssetsManager, MeshAssetTask } from '@babylonjs/core';
import { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import '@babylonjs/core/Collisions';
import { Engine } from '@babylonjs/core/Engines/engine';
import {
  PointerEventTypes,
  PointerInfo,
} from '@babylonjs/core/Events/pointerEvents';
import { HemisphericLight, PointLight, ShadowGenerator } from '@babylonjs/core/Lights';
import '@babylonjs/core/Loading/loadingScreen';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { AbstractMesh, MeshBuilder } from '@babylonjs/core/Meshes';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import '@babylonjs/loaders/glTF';
import { Grid, Engine as HexEngine } from 'hexapi';
import * as _ from 'lodash';
import { ModelMeshes } from '../model/model-meshes.model';
import { TacMap } from '../model/tacmap.model';
import { BabylonUtilService } from '../util/babylon-util.service';
import * as hexapi from 'hexapi';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  protected engine: Engine;
  protected canvas: HTMLCanvasElement;
  protected camera: FreeCamera | ArcRotateCamera;
  protected light: PointLight;
  protected diffuseLight: HemisphericLight;
  public meshSize = 1.0;
  private assetsManager: AssetsManager;
  private modelCount = 0;
  private modelMeshes: ModelMeshes[] = [];

  rootMesh: Mesh;
  scene: Scene;
  currentGroup: AnimationGroup[];
  map: TacMap;
  grid: hexapi.Grid;
  gridX: number;
  gridY: number;

  public constructor(
    readonly ngZone: NgZone,
    @Inject(DOCUMENT) readonly document: Document,
    private http: HttpClient,
    private utilService: BabylonUtilService
  ) { }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    //Animation['AllowMatricesInterpolation'] = true;

    this.canvas = canvas.nativeElement;
    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.assetsManager = new AssetsManager(this.scene);
    this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1);
    this.rootMesh = MeshBuilder.CreateDisc(
      'root',
      { radius: 0.01 },
      this.scene
    );
    this.diffuseLight = new HemisphericLight("diffuse_light", new Vector3(0, 1, 0), this.scene);
    this.diffuseLight.intensity = 0.1;
    this.light = new PointLight('light1', new Vector3(0, 8, 0), this.scene);
    this.light.intensity = 150;


    // Shadows
    var shadowGenerator = new ShadowGenerator(1024, this.light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    var lookingAtPosition = new Vector3(0, 0, 0);
    var camera = new ArcRotateCamera(
      'Camera',
      (3 * Math.PI) / 2,
      Math.PI / 2.2,
      5,
      Vector3.Zero(),
      this.scene
    );
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 10;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 4;

    //The goal distance of camera from target
    camera.radius = 30;

    // This attaches the camera to the canvas
    camera.attachControl(true);

    // load map tiles
    this.loadMap('start', this.scene);

    // generates the world x-y-z axis for better understanding
    this.utilService.showWorldAxis(this.scene, 8);

    //this.playerService.addPlayer(this.scene, camera);

    this.scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
      return;
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
          console.log('POINTER DOWN');
          break;
        case PointerEventTypes.POINTERUP:
          console.log('POINTER UP');
          break;
        case PointerEventTypes.POINTERMOVE:
          console.log('POINTER MOVE');
          break;
        case PointerEventTypes.POINTERWHEEL:
          console.log('POINTER WHEEL');
          break;
        case PointerEventTypes.POINTERPICK:
          console.log('POINTER PICK');
          const id = pointerInfo.pickInfo.pickedMesh.uniqueId;
          break;
        case PointerEventTypes.POINTERTAP:
          console.log('POINTER TAP');
          console.log(pointerInfo);
          break;
        case PointerEventTypes.POINTERDOUBLETAP:
          console.log('POINTER DOUBLE-TAP');
          break;
      }
    });
  }

  start(inZone = true): void {
    if (inZone) {
      this.ngZone.runOutsideAngular(() => {
        this.startTheEngine();
      });
    } else {
      this.startTheEngine();
    }
  }

  stop(): void {
    this.scene.dispose();
    this.engine.stopRenderLoop();
    this.engine.dispose();
    this.camera.dispose();
    window.removeEventListener('resize', () => { });
  }

  private startTheEngine() {
    let freshRender = true;
    const element = this.document.getElementById('fpsLabel');

    this.engine.runRenderLoop(() => {
      this.scene.render();
      if (element) {
        element.innerHTML = this.engine.getFps().toFixed() + ' fps';
      }
      if (freshRender) {
        this.engine.resize();
        freshRender = false;
      }
    });
    window.addEventListener('resize', () => this.engine.resize());
  }

  public loadMap(map: string, scene: Scene) {
    this.http.get(`assets/maps/${map}.json`).subscribe(
      (result: TacMap) => {
        this.map = result;
        this.gridY = result.tiles[0].length;
        this.gridX = result.tiles.length;
        this.grid = Grid({
          rows: this.gridX,
          cols: this.gridY,
          hexSize: { x: 1, y: 1 },
          type: 'flat',
        });

        const tiles = this.map.tiles.reduce(
          (accumulator, value) => accumulator.concat(value),
          []
        );
        const modelNames = tiles.map((tile) => tile.model);

        const uniqueModelNames: string[] = _.uniq(modelNames);
        this.modelCount = uniqueModelNames.length;
        uniqueModelNames.forEach((model: string) => {
          var meshTask = this.assetsManager.addMeshTask(
            `${model}`,
            '',
            `./assets/models/hex/${model}`,
            null
          );
          meshTask.onSuccess = this.meshLoaded.bind(this);
          meshTask.onError = this.meshError.bind(this);
        });

        this.assetsManager.onProgress = this.updateProgress.bind(this);
        this.assetsManager.onFinish = this.createMapFromTiles.bind(this);
        this.assetsManager.load();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  private meshLoaded(task: MeshAssetTask) {
    const index = this.modelMeshes.length;
    this.modelMeshes[index] = {
      name: task.name,
      meshes: task.loadedMeshes,
    };
    task.loadedMeshes.forEach((mesh: AbstractMesh) => {
      mesh.isVisible = false;
      mesh.setParent(null);
    });
  }

  private meshError(task, message, exception): void {
    console.log(message);
    console.log(exception);
  }

  private updateProgress(remainingCount, totalCount, lastFinishedTask) {
    this.engine.loadingScreen.loadingUIText = `Loading (${totalCount - remainingCount} of ${totalCount})`;
  }

  createMapFromTiles(): void {
    this.map.tiles.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        const modelMeshes = this.modelMeshes.find(
          (mesh) => mesh.name === tile.model
        );
        modelMeshes.meshes.forEach((mesh: AbstractMesh, index: number) => {
          var newInstance = (mesh as Mesh).instantiateHierarchy(this.rootMesh);
          newInstance.name = `tile${rowIndex}-${columnIndex}-${index}`;
          newInstance.setParent(this.rootMesh);
          const offsetX = (columnIndex % 2) * (this.meshSize / 2);
          newInstance.position.x = rowIndex * this.meshSize + offsetX;
          newInstance.position.z = columnIndex * this.meshSize;
        });
      });
    });
  }
}
