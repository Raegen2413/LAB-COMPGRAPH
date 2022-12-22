import * as THREE from "./three.js/build/three.module.js"
import {OrbitControls} from "./three.js/examples/jsm/controls/OrbitControls.js"

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

// 5.b. Hot Air Balloon
function createBalloon(){
    // load model
    // cast and recieve shadow
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
function createPoles(posX, posY, posZ, rotX, rotY, rotZ){
    let polesGeo = new THREE.CylinderGeometry(1, 1, 50, 16)
    let polesMat = new THREE.MeshPhongMaterial({
        color: "#646FD4"
    })
    let polesMesh = new THREE.Mesh(polesGeo, polesMat)
    polesMesh.position.set(posX, posY, posZ)
    polesMesh.rotation.set(rotX, rotY, rotZ)
    polesMesh.castShadow = true
    polesMesh.receiveShadow = true
    scene.add(polesMesh)
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

function createButtonSphere(){
    let buttonSphereGeo = new THREE.SphereGeometry(4.5, 32, 16)
    let buttonSphereMat = new THREE.MeshPhongMaterial({
        color: "#dc143c"
    })
    let buttonSphereMesh = new THREE.Mesh(buttonSphereGeo, buttonSphereMat)
    buttonSphereMesh.position.set(-46, 3, 63)
    buttonSphereMesh.castShadow = true
    buttonSphereMesh.receiveShadow = true
    scene.add(buttonSphereMesh)
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
    createBalloon()
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
    createPoles(0, 15, 35, -Math.PI/6, 0, 0)
    createPoles(0, 15, -35, Math.PI/6, 0, 0)
    createButtonBox()
    createButtonSphere()
}

function keyboardListener(event){
    if(event.keyCode == 32){
        if(currentCam == fixedCam) currentCam = freeCam;
        else currentCam = fixedCam;
    }
}

function mouseClick(){
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)
    // const intersects = raycaster.intersectObjects(scene.children)
}

function addListener(){
    document.addEventListener("keydown", keyboardListener)
    // document.addEventListener("click", mouseClick)
}

function render(){
    control.update()
    requestAnimationFrame(render)
    renderer.render(scene, currentCam)
}

window.onload = function () {
    init()
    addListener()
    render()
}