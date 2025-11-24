export function getBookImageUrl(imgPath) {
    if (!imgPath) {
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23e5e7eb" width="300" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E';
    }
    
    // Jika URL lengkap
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        return imgPath;
    }
    
    // Jika path relatif
    if (imgPath.startsWith('/')) {
        return imgPath;
    }
    
    // Jika hanya nama file
    return `/images/books/${imgPath}`;
}