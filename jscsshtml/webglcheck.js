import WebGL from '../node_modules/three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

// taken directly from https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check