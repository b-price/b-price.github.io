import * as THREE from 'three';
// import { Color } from 'three';

// import Stats from 'three/addons/libs/stats.module.js';

let container, stats, clock;

let camera, scene, renderer;

let line;

const segments = 333;
const r = 800;
const interval = 1/24;
let dlta = 0;
let t = 0;

init();
animate();

function init() {

    container = document.body;

    //

    camera = new THREE.PerspectiveCamera( 7, window.innerWidth / window.innerHeight, 10, 4000 );
    camera.position.z = 2400;

    scene = new THREE.Scene();
    

    clock = new THREE.Clock();

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial( { vertexColors: true } );

    const positions = [];
    const colors = [];
    var rand;

    for ( let i = 0; i < segments; i ++ ) {

        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        // positions

        positions.push( x, y, z );

        // colors 
        rand =  Math.random()/3; 

        colors.push( rand );
        colors.push( rand );
        colors.push( rand );

    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    generateMorphTargets( geometry );

    geometry.computeBoundingSphere();

    line = new THREE.Line( geometry, material );
    scene.add( line );

    //

    renderer = new THREE.WebGLRenderer( {alpha: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    //

    // stats = new Stats();
    // container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize );
    scene.background = null;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );
    dlta += clock.getDelta();
    if ( dlta > interval){
        render();
        dlta = dlta % interval;
    }
    
    //stats.update();

}

function render() {

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    line.rotation.x = time * 0.05;
    line.rotation.y = time * 0.1;

    t += delta * 0.3;
    line.morphTargetInfluences[ 0 ] = Math.abs( Math.sin( t ) );

    renderer.render( scene, camera );

}

function generateMorphTargets( geometry ) {

    const data = [];

    for ( let i = 0; i < segments; i ++ ) {

        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        data.push( x, y, z );

    }

    const morphTarget = new THREE.Float32BufferAttribute( data, 3 );
    morphTarget.name = 'target1';

    geometry.morphAttributes.position = [ morphTarget ];

}