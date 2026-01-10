import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { SKILLS_DATA } from '../../constants';

const SkillBall = ({ position, icon: Icon, name }) => {
    const ref = useRef();

    // Random animation parameters
    const { speed, offset, factor } = useMemo(() => ({
        speed: 0.5 + Math.random(),
        offset: Math.random() * 10,
        factor: 0.5 + Math.random() * 0.5
    }), []);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();

        // Floating animation
        ref.current.position.y = position[1] + Math.sin(t * speed + offset) * factor * 0.5;
        ref.current.position.x = position[0] + Math.cos(t * speed * 0.5 + offset) * factor * 0.2;

        // Gentle rotation
        ref.current.rotation.x = Math.sin(t * 0.2 + offset) * 0.2;
        ref.current.rotation.y = Math.cos(t * 0.2 + offset) * 0.2;
    });

    return (
        <mesh ref={ref} position={position} castShadow receiveShadow>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.8} envMapIntensity={1.5} />
            <Html center distanceFactor={10} transform pointerEvents="none">
                <div className="flex flex-col items-center justify-center select-none">
                    <Icon className="text-white w-6 h-6 mb-1" />
                    <span className="text-xs text-white font-bold whitespace-nowrap">{name}</span>
                </div>
            </Html>
        </mesh>
    );
};

const SkillsScene = () => {
    // Generate fixed positions for the balls to avoid overlap
    const skills = useMemo(() => SKILLS_DATA.flatMap(s => s.items), []);
    const positions = useMemo(() => {
        const pos = [];
        const count = skills.length;
        const radius = 4;
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
            const r = Math.sqrt(1 - y * y); // radius at y
            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            pos.push([x * radius, y * radius, z * radius * 0.5]); // Flatten Z slightly
        }
        return pos;
    }, [skills]);

    return (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={1.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />

            {skills.map((skill, i) => (
                <SkillBall
                    key={i}
                    position={positions[i]}
                    icon={skill.icon}
                    name={skill.name}
                />
            ))}
        </Canvas>
    );
};

export default SkillsScene;
