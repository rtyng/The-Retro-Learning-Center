import * as THREE from 'three';

// Create scene, camera, and renderer using three.js
// These will be used to create a rotating 3d cube
 
const scene = new THREE.Scene();

// Attriubtes for Perspectivecamera are FOV, aspect ratio, near and far "clipping" planes for last 2 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Multiple types of cameras in three
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement) ;

// Create cube here

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );
camera.position.z = 5;

// Code for animation loop


function animate() {
    requestAnimationFrame( animate ); 

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}

animate();