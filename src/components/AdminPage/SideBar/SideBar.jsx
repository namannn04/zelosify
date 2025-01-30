"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SideBar = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
    });
    const torusKnot = new THREE.Mesh(geometry, material);

    scene.add(torusKnot);
    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default SideBar;
