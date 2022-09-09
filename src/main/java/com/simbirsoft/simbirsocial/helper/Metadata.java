package com.simbirsoft.simbirsocial.helper;

import com.simbirsoft.simbirsocial.domain.Point;
import java.io.File;
import java.io.IOException;
import java.util.List;
import org.apache.commons.imaging.ImageReadException;
import org.apache.commons.imaging.Imaging;
import org.apache.commons.imaging.common.ImageMetadata;
import org.apache.commons.imaging.formats.jpeg.JpegImageMetadata;
import org.apache.commons.imaging.formats.tiff.TiffImageMetadata;

public class Metadata {

    public static Point metadata(final File file) throws ImageReadException, IOException {
        Point result = new Point();
        final ImageMetadata metadata = Imaging.getMetadata(file);
        if (metadata instanceof JpegImageMetadata) {
            final JpegImageMetadata jpegMetadata = (JpegImageMetadata) metadata;
            final TiffImageMetadata exifMetadata = jpegMetadata.getExif();

            if (null != exifMetadata) {
                final TiffImageMetadata.GPSInfo gpsInfo = exifMetadata.getGPS();
                if (null != gpsInfo) {
                    result.setLongitude(gpsInfo.getLongitudeAsDegreesEast());
                    result.setLatitude(gpsInfo.getLatitudeAsDegreesNorth());
                }
            }
        }

        return result;
    }
}
