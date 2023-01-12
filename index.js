import * as THREE from "./three.js/build/three.module.js"
import { OrbitControls } from "./three.js/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "./three.js/examples/jsm/loaders/GLTFLoader.js"
import {FontLoader} from './three.js/examples/jsm/loaders/FontLoader.js'

var scene, renderer, control, mouse, textureLoader
var currentCam, fixedCam, freeCam

// 5.a. Ground Object
function createGround(){
    let groundGeo = new THREE.PlaneGeometry(1000, 1000)
    let groundMat = new THREE.MeshStandardMaterial({
        color: "#8c3b0c"
    })
    let groundMesh = new THREE.Mesh(groundGeo, groundMat)
    groundMesh.position.set(0, -5, 0)
    groundMesh.rotation.set(-Math.PI/2, 0, 0)
    groundMesh.receiveShadow = true
    scene.add(groundMesh)
}

var balloon
// 5.b. Hot Air Balloon
function renderBalloon(){
    let loader = new GLTFLoader()
    loader.load('./assets/model/scene.gltf', function (gltf){
        let model = gltf.scene
        model.castShadow = true
        model.receiveShadow = true
        model.scale.set(0.1, 0.1, 0.1)
        balloon = model
        scene.add(balloon)
    })
}

// 5.c. Crate A
function createCrateA(width, height, depth, posX, posY, posZ, rotX, rotY, rotZ){
    let crateAGeo = new THREE.BoxGeometry(width, height, depth)
    let crateAMat = new THREE.MeshPhongMaterial({
        map: textureLoader.load("./assets/texture/crate1.jpeg")
    })
    let crateAMesh = new THREE.Mesh(crateAGeo, crateAMat)
    crateAMesh.position.set(posX, posY, posZ)
    crateAMesh.rotation.set(rotX, rotY, rotZ)
    crateAMesh.castShadow = true
    crateAMesh.receiveShadow = true
    scene.add(crateAMesh)
}

// 5.d. Crate B
function createCrateB(width, height, depth, posX, posY, posZ, rotX, rotY, rotZ){
    let crateBGeo = new THREE.BoxGeometry(width, height, depth)
    let crateBMat = new THREE.MeshPhongMaterial({
        map: textureLoader.load("./assets/texture/crate2.jpeg")
    })
    let crateBMesh = new THREE.Mesh(crateBGeo, crateBMat)
    crateBMesh.position.set(posX, posY, posZ)
    crateBMesh.rotation.set(rotX, rotY, rotZ)
    crateBMesh.castShadow = true
    crateBMesh.receiveShadow = true
    scene.add(crateBMesh)
}

// 5.e. Tires
function createTires(posX, posY, posZ, rotX, rotY, rotZ){
    let tiresGeo = new THREE.TorusGeometry(5, 2.5, 16, 100)
    let tiresMat = new THREE.MeshStandardMaterial({
        color: "#3e444c"
    })
    let tiresMesh = new THREE.Mesh(tiresGeo, tiresMat)
    tiresMesh.position.set(posX, posY, posZ)
    tiresMesh.rotation.set(rotX, rotY, rotZ)
    tiresMesh.castShadow = true
    tiresMesh.receiveShadow = true
    scene.add(tiresMesh)
}

// 5.f. Poles
var pole = [null]
function createPoles(number, posX, posY, posZ, rotX, rotY, rotZ){
    let polesGeo = new THREE.CylinderGeometry(1, 1, 50, 16)
    let polesMat = new THREE.MeshPhongMaterial({
        color: "#646FD4"
    })
    let polesMesh = new THREE.Mesh(polesGeo, polesMat)
    polesMesh.position.set(posX, posY, posZ)
    polesMesh.rotation.set(rotX, rotY, rotZ)
    polesMesh.castShadow = true
    polesMesh.receiveShadow = true
    pole[number] = polesMesh
    scene.add(pole[number])
}

// 5.g. Button (box and sphere) INCOMPLETE!! blm bisa berubah warna dan di interact
function createButtonBox(){
    let buttonBoxGeo = new THREE.BoxGeometry(10, 16.5, 14.5)
    let buttonBoxMat = new THREE.MeshPhongMaterial({
        color: "#848482"
    })
    let buttonBoxMesh = new THREE.Mesh(buttonBoxGeo, buttonBoxMat)
    buttonBoxMesh.position.set(-43, 3, 65)
    buttonBoxMesh.rotation.set(0, -Math.PI/6, 0)
    buttonBoxMesh.castShadow = true
    buttonBoxMesh.receiveShadow = true
    scene.add(buttonBoxMesh)
}

var tombol
function createButtonSphere(){
    let buttonSphereGeo = new THREE.SphereGeometry(4.5, 32, 16)
    let buttonSphereMat = new THREE.MeshPhongMaterial({
        color: "#dc143c"
    })
    let buttonSphereMesh = new THREE.Mesh(buttonSphereGeo, buttonSphereMat)
    buttonSphereMesh.position.set(-46, 3, 63)
    buttonSphereMesh.castShadow = true
    buttonSphereMesh.receiveShadow = true
    tombol = buttonSphereMesh
    scene.add(tombol)
}

var eventStatus = "idle"
var doRotation = false
function buttonEvent(){
    let btnColor = tombol.material.color

    if(eventStatus == "idle"){
        btnColor.set("#fada5e")
        eventStatus = "raisePoles"
    }else if(eventStatus == "readyToFly"){
        eventStatus = "fly"
    }else if(doRotation){
        btnColor.set("#32cd32")
    }
}

// 4.a. Ambient Light
function createAmbientLight(){
    let light = new THREE.AmbientLight("#404040")
    scene.add(light)
}

// 4.b.c.d. SpotLight
function createSpotLight(intensity, x, y, z, angle){
    let light = new THREE.SpotLight("#FFFFFF", intensity, 300, angle)
    light.position.set(x, y, z)
    light.castShadow = true
    scene.add(light)
}

// 5.h. Text
function createFont(){
    let loader = new FontLoader()
    loader.load('./three.js/examples/fonts/helvetiker_bold.typeface.json', function (font1){
        
        let geo = new TextGeometry
        ('Click Me!',{
            font:font1,
            size:10,
            height:2
        })
        let material = new THREE.MeshPhongMaterial()
        mesh = new THREE.Mesh(geo, material)
        mesh.position.set(-35,25,50)
        mesh.rotation.set(0, Math.PI * 3 + 1, 0)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
     })
}

// 6 Skybox
function createSkybox(){
    let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000)
    let loader = new THREE.TextureLoader()

    let right = loader.load('./assets/skybox/dawn_right.png')
    let left = loader.load('./assets/skybox/dawn_left.png')
    let top = loader.load('./assets/skybox/dawn_top.png')
    let bot = loader.load('./assets/skybox/dawn_bottom.png')
    let front = loader.load('./assets/skybox/dawn_front.png')
    let back = loader.load('./assets/skybox/dawn_back.png')

    let skyboxMat = [
        new THREE.MeshBasicMaterial({
            map : right,
            side:THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map : left,
            side:THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map : top,
            side:THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map : bot,
            side:THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map : front,
            side:THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map : back,
            side:THREE.BackSide
        }),
    ]
    
    let skyboxMesh = new THREE.Mesh(skyboxGeo, skyboxMat)
    scene.add(skyboxMesh)
}

/**********************************************************/
function init() {
    // 2. Scene
    scene = new THREE.Scene()

    // 3.a. Fixed Camera
    fixedCam = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 5000)
    fixedCam.position.set(-180, 30, 0)
    fixedCam.lookAt(0, 30, 0)

    // 3.b. Free Camera
    freeCam = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 5000)
    freeCam.position.set(-200, 50, 0)
    freeCam.lookAt(0, 0, 0)
    
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    textureLoader = new THREE.TextureLoader()

    control = new OrbitControls(freeCam, renderer.domElement)
    currentCam = fixedCam

    createAmbientLight()
    createSpotLight(1, -100, 0, 100)
    createSpotLight(1, -100, 0, -100)
    createSpotLight(0.5, 0, 200, 0, Math.PI/4 + Math.PI/6)
    createGround()
    renderBalloon();
    createCrateA(10, 10, 10, -30, 0, -40, 0, 0, 0)
    createCrateA(5, 5, 5, -30, -2, -48, Math.PI/6, 0, 0)
    createCrateA(10, 15, 10, -40, 2.5, 30, 0, -Math.PI/4, 0)
    createCrateB(20, 20, 20, 30, 5, 40, 0, Math.PI/3, 0)
    createCrateB(40, 15, 30, 30, 2.5, -60, 0, -Math.PI/6, 0)
    createTires(-70, -5, 0, 0, Math.PI/2, 0)
    createTires(-65, -5, 20, 0, Math.PI/2 + (Math.PI/9 * 1), 0)
    createTires(-65, -5, -20, 0, -(Math.PI/2 + (Math.PI/9 * 1)), 0)
    createTires(-55, -5, 40, 0, Math.PI/2 + (Math.PI/9 * 2), 0)
    createTires(-55, -5, -40, 0, -(Math.PI/2 + (Math.PI/9 * 2)), 0)
    createPoles(1, 0, 15, 35, -Math.PI/6, 0, 0)
    createPoles(2, 0, 15, -35, Math.PI/6, 0, 0)
    createButtonBox()
    createButtonSphere()
    createSkybox()
    createFont()
}
/**********************************************************/

function keyboardListener(event){
    if(event.keyCode == 32){
        if(currentCam == fixedCam) currentCam = freeCam;
        else currentCam = fixedCam;
    }
}

function mouseClick(){
    if(currentCam == freeCam) return

    let raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, currentCam)
    const intersects = raycaster.intersectObjects(scene.children)

    if(intersects[0].object == tombol){
        buttonEvent()
    }
}

function addListener(){
    document.addEventListener("keydown", keyboardListener)
    document.addEventListener("click", mouseClick)
}

var speed = 0.005
var tilt = 0.001
function render(){
    control.update()
    requestAnimationFrame(render)
    renderer.render(scene, currentCam)

    if(currentCam == freeCam) return

    if(eventStatus == "raisePoles"){

        if(pole[1].rotation.x < 0 && pole[1].rotation.x + speed < 0){
            pole[1].rotation.x += speed
        }else pole[1].rotation.x = 0

        if(pole[2].rotation.x > 0 && pole[2].rotation.x - speed > 0){
            pole[2].rotation.x -= speed
        }
        
        if(pole[1].rotation.x >= 0){
            eventStatus = "readyToFly"
        }
    }else if(eventStatus == "fly"){
        balloon.position.y += speed * 2
        if(balloon.position.y > 20){
            doRotation = true
            buttonEvent()
        }
    }

    if(doRotation){
        balloon.position.y += speed * 6
        console.log(balloon.rotation.x)
        if(balloon.rotation.x > 0.15 || balloon.rotation.x < -0.15){
            tilt *= -1
        }
        balloon.rotation.x += tilt
        balloon.rotation.y += 0.001
    }
}

window.onload = function () {
    init()
    addListener()
    render()
}

// Get mouse position
window.onmousemove = function(event){
    mouse = new THREE.Vector2()

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1

    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
}