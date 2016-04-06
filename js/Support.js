function webGLIsSupported() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (error) {
        return false;
    }
}

function createErrorNotification() {
    var element = document.createElement('div');
    element.id = 'error-message';
    element.innerHTML = 'Your graphics card or browser doesn\'t seem to support WebGL.';
}