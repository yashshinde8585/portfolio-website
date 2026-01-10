import PropTypes from 'prop-types';
import KineticReel from './KineticReel';

/**
 * GalleryDetailView - Displays meetup/event details with kinetic image reel
 * Specialized view for visual content with overlay information
 */
const GalleryDetailView = ({ selectedItem }) => {
    return (
        <div className="absolute inset-0 z-40 rounded-2xl overflow-hidden">
            <KineticReel images={selectedItem.images} />

            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#05050A] via-[#05050A]/80 to-transparent z-50 pointer-events-none">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.name}</h3>
                <p className="text-indigo-400 font-medium">{selectedItem.role}</p>
            </div>
        </div>
    );
};

GalleryDetailView.propTypes = {
    selectedItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

export default GalleryDetailView;
