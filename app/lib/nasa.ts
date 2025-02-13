const NASA_IMAGE_URL = 'https://images-api.nasa.gov';

export async function getNasaImage(searchQuery: string): Promise<string> {
    try {
        const response = await fetch(
            `${NASA_IMAGE_URL}/search?q=${encodeURIComponent(searchQuery)}&media_type=image&page=1`
        );
        const data = await response.json();

        const firstImage = data.collection.items[0]?.links?.[0]?.href;
        return firstImage || 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001292/GSFC_20171208_Archive_e001292~orig.jpg';
    } catch (error) {
        console.error('Error fetching NASA image based on search param:', error);
        return 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001292/GSFC_20171208_Archive_e001292~orig.jpg';
    }
} 