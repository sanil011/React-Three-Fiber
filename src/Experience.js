import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useThree } from '@react-three/fiber'
import CustomObject from './CustomObject'
extend({OrbitControls})
const Experience = () => {

    const {camera, gl} = useThree();
    const cubeRef = useRef();
    useFrame((state, delta) => {

        // const angle = state.clock.elapsedTime;
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
        // state.camera.lookAt(0, 0, 0);

        cubeRef.current.rotation.y += delta
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5}/>

            <mesh position={[0, -1, 0]} rotation-x={- Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="green" />
            </mesh>
            <group >
                <mesh position-x={-2} >
                    <sphereGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>

                <mesh ref={cubeRef}  rotateY={Math.PI * 0.25} position={[2, 0, 0]} scale={1.5}>
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="voilet" />
                </mesh>
            </group>

            <CustomObject/>
        </>
    )
}

export default Experience