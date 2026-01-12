import { Helmet } from 'react-helmet-async';
import { SOCIAL_LINKS, SKILLS_DATA, PROFILE } from '../../constants';

const Meta = ({
    title = `${PROFILE.name} | ${PROFILE.title}`,
    description = PROFILE.bio,
    keywords = "Full Stack Developer, React Developer, Web Development, JavaScript, Node.js, Portfolio, Yash Shinde",
    image = "/og-image.png", // Assuming you have an OG image in public folder
    url = "https://yashshinde.com" // Replace with actual URL
}) => {

    // Construct Structured Data (JSON-LD)
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Yash Shinde",
        "jobTitle": "Full Stack Developer",
        "url": url,
        "sameAs": SOCIAL_LINKS.map(link => link.href),
        "knowsAbout": SKILLS_DATA.flatMap(category => category.items.map(skill => skill.name)),
        "image": `${url}${image}`,
        "description": description
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
        </Helmet>
    );
};

export default Meta;
