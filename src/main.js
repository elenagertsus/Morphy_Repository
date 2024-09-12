import  {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function(){
    var cameraKit = await bootstrapCameraKit( {apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI2MTU4MzIwLCJzdWIiOiI4OGI2Y2EzNS1kOWRiLTRhYTctOGI4Zi0wZDJhNWZkY2I3NmN-U1RBR0lOR34wMjQyNzAxZS0xOTZkLTQ1MDgtYTE4OC02M2Q2YzUzZjM4MjAifQ._5GJOR1M1_h6upv8TkQ0_RQBEcURU8gRKJwwSSRMDVA'})

    const session = cameraKit.createSession()
    document.getElementById('canvas').replaceWith((await session).output.live)

    const { lenses  } = await cameraKit.lensRepository.loadLensGroups(['954fae4d-cc1b-4c88-88c6-20ebd3ccb52a'])

    session.applyLens(lenses[0])

    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: 
        { facingMode: 'environment' }
});

    const source = createMediaStreamSource(mediaStream, {
       // transform: Transform2D.MirrorX,
        cameraType: 'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})();