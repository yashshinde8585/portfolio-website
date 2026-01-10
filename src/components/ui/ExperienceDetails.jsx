import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import InternshipCard from './InternshipCard';
import StandardDetailView from './StandardDetailView';
import GalleryDetailView from './GalleryDetailView';
import { EXPERIENCE_DATA } from '../../constants';

import { use3DTilt } from '../../hooks/use3DTilt';

/**
 * ExperienceDetails - Controller component that manages experience detail views
 * Follows Open/Closed Principle: open for extension (new views), closed for modification
 */
const ExperienceDetails = ({ activeInfo, onClose }) => {
    const [showDetailed, setShowDetailed] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredProject, setHoveredProject] = useState(null);
    const closeButtonRef = useRef(null);

    // 3D Tilt & Specular Edge Logic
    const cardRef = useRef(null);
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt(cardRef);

    // Focus management
    React.useEffect(() => {
        if (showDetailed && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [showDetailed]);

    // Helper to determine pill style
    const getPillStyle = (techId) => {
        if (!hoveredProject) return "opacity-100 scale-100 bg-indigo-500/20 border-indigo-500/30 text-indigo-300";

        const isRelevant = hoveredProject.relatedTech.includes(techId);
        return isRelevant
            ? "opacity-100 scale-100 bg-indigo-500/40 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            : "opacity-20 blur-[1px] grayscale bg-white/5 border-white/5 text-gray-500";
    };

    // Configuration: Map activeInfo to data source
    const getDataSource = () => {
        const dataMap = {
            internships: EXPERIENCE_DATA.internships.companies,
            academic: EXPERIENCE_DATA.academic.items,
            meetups: EXPERIENCE_DATA.meetups.items,
            projects: EXPERIENCE_DATA.projects.items,
            achievements: EXPERIENCE_DATA.achievements.items
        };
        return dataMap[activeInfo] || [];
    };

    // View selector: Determines which detail view to render
    const renderDetailView = (selectedItem) => {
        // Configuration-based view selection (Open/Closed Principle)
        const viewConfig = {
            meetups: GalleryDetailView,
            internships: StandardDetailView,
            academic: StandardDetailView,
            projects: StandardDetailView,
            achievements: StandardDetailView
        };

        const ViewComponent = viewConfig[activeInfo] || StandardDetailView;

        // GalleryDetailView has different props than StandardDetailView
        if (ViewComponent === GalleryDetailView) {
            return <ViewComponent selectedItem={selectedItem} />;
        }

        return (
            <ViewComponent
                selectedItem={selectedItem}
                hoveredProject={hoveredProject}
                onProjectHover={setHoveredProject}
                getPillStyle={getPillStyle}
            />
        );
    };

    const dataSource = getDataSource();
    const selectedItem = dataSource[currentIndex];

    return (
        <motion.div
            key={activeInfo}
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className="absolute inset-0 p-8 flex flex-col bg-[#0F172A] md:bg-white border border-white/10 md:border-slate-200 rounded-2xl specular-border md:shadow-xl"
        >
            {!showDetailed ? (
                <>
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-slate-100 md:text-slate-900">
                            {EXPERIENCE_DATA[activeInfo].title}
                        </h3>
                        <button
                            onClick={onClose}
                            aria-label="Close experience details"
                            className="p-2 rounded-full hover:bg-white/10 md:hover:bg-slate-100 text-slate-400 md:text-slate-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                        {dataSource.map((item, i) => (
                            <InternshipCard
                                key={i}
                                company={item}
                                index={i}
                                clickable={activeInfo !== 'internships'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetailed(true);
                                    setCurrentIndex(i);
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="h-full flex flex-col relative"
                >
                    {/* Close Button - Top Right */}
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowDetailed(false);
                        }}
                        style={{ transform: "translateZ(50px)" }}
                        className="absolute -top-4 -right-4 z-50 flex items-center justify-center p-2 rounded-full bg-white/5 md:bg-white text-slate-400 md:text-slate-600 border border-white/5 md:border-slate-200 hover:bg-white/10 md:hover:bg-slate-50 hover:text-white md:hover:text-slate-900 hover:border-white/20 hover:scale-110 transition-all duration-300 ease-out cursor-pointer md:shadow-md"
                        aria-label="Close details"
                    >
                        <X size={20} />
                    </button>

                    {selectedItem && renderDetailView(selectedItem)}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ExperienceDetails;
