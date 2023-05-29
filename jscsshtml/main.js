import * as THREE from '..\\three.js';

// Create scene, camera, and renderer using three.js
// These will be used to create a rotating 3d cube

var scene = new THREE.scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cube here

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

// Code for animation loop

function animate() {
    requestAnimationFrame(animate); 
    renderer.render(scene, camera);
}
animate();

// Add an event listener for mouse movement

document.addEventListener('mousemove', onDocumentMouseMove, false);

// Function for rotation based on mouse position

var mouseX = 0;
var mouseY = 0;
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight/ 2) / 100;

    cube.rotation.x += mouseY;
    cube.rotation.y += mouseX;
}


