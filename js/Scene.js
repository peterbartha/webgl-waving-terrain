
if (!webGLIsSupported) {
    createErrorNotification();
    document.getElementById('container').innerHTML = '';
}

var container;
var statsAreVisible = false, stats;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var plane;
var segments = 50;
var frameCounter = 0;

init();
animate();

function init() {
    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    setScene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    if (statsAreVisible) showStatistics();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function setScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 500, 1000);

    var geometry = new THREE.PlaneGeometry(3000, 3000, segments, segments);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: true
    });
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;

    scene.add(plane);
}

function showStatistics() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    if (statsAreVisible) stats.update();
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    var i = 0;
    var vertices = plane.geometry.vertices;
    for (var ix = 0; ix <= segments; ix++) {
        for (var iy = 0; iy <= segments; iy++) {
            var vertex = vertices[i++];
            vertex.z = (Math.sin((ix + frameCounter) * 0.3) * 50) + (Math.sin((iy + frameCounter) * 0.5) * 50);
        }
    }
    plane.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);
    frameCounter += 0.1;
}
