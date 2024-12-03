'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardImg from '../../../assets/images/Dashboard.png'
import InsightImg from '../../../assets/images/insight.png';
import SearchImg from '../../../assets/images/search.png';

const features = [
    {
        title: "Centralized Contract Intelligence",
        description: "Aggregate and access all your contract data in one unified platform, turning unstructured data into actionable insights.",
        image: DashboardImg,
        imageHeight: 450,
        imageWidth: 800,
    },
    {
        title: "Search with Confidence",
        description: "Get instant answers to your queries with highlighted citations, ensuring accuracy and reliability every time.",
        image: SearchImg,
        imageHeight: 400,
        imageWidth: 800,
    },
    {
        title: "Insights That Drive Action",
        description: "Uncover deep insights from contracts using advanced generative AI, empowering smarter and faster decisions.",
        image: InsightImg,
        imageHeight: 450,
        imageWidth: 800,
    },
]

export default function FeaturesSection() {
    const containerRef = useRef(null)
    const [activeFeature, setActiveFeature] = useState(0)

    const featureRefs = useRef([])

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = featureRefs.current.findIndex(ref => ref === entry.target)
                    setActiveFeature(index)
                }
            })
        }, observerOptions)

        featureRefs.current.forEach(ref => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <section id="features" className="bg-[#0F0725] relative overflow-x-hidden">
            <div className="bg-[#0F0725] pt-16">
                <div className="max-w-7xl mx-auto px-2 sm:px-2 md:px-4">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                                Your New Vendor Management Workspace
                            </span>
                        </h2>
                        <p className="text-purple-200/80 max-w-3xl mx-auto text-lg sm:text-2xl">
                            Discover how our platform can transform your workflow
                        </p>
                    </motion.div>
                </div>
            </div>

            <div ref={containerRef} className="relative">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        ref={(el) => (featureRefs.current[index] = el)}
                        className="min-h-[75vh] flex items-center justify-center py-8 md:py-16"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-2 md:px-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative order-2 md:order-none"
                                >
                                    <div className="relative rounded-lg overflow-hidden">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            height={feature.imageHeight}
                                            width={feature.imageWidth}
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="absolute inset-0 bg-purple-600/10"></div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="space-y-6 order-1 md:order-none"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-purple-200/80 text-lg">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
