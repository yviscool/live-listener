const ioHook = require('iohook');


// { shiftKey: false,
//     altKey: false,
//     ctrlKey: true,
//     metaKey: false,
//     keycode: 46,
//     rawcode: 67,
//     type: 'keydown' }

ioHook.on('keydown', event => {
    if (event.ctrlKey && event.keycode == 46) {

        console.log('复制了')

    }
});

ioHook.on('keyup', event => {
    if (event.ctrlKey && event.keycode == 46) {
        console.log('复制取消了')
    }
});

// Register and start hook
ioHook.start();

// // Alternatively, pass true to start in DEBUG mode.
// ioHook.start(true);