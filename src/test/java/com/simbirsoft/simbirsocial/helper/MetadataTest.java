package com.simbirsoft.simbirsocial.helper;

import static org.junit.jupiter.api.Assertions.*;

import com.simbirsoft.simbirsocial.domain.Point;
import com.simbirsoft.simbirsocial.security.PersistentTokenRememberMeServices;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.commons.imaging.ImageReadException;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class MetadataTest {

    private final Logger log = LoggerFactory.getLogger(MetadataTest.class);

    @Test
    void metadataExample() {
        String resourceName = "src//test//resources//test.jpg";
        File file = new File(resourceName);
        Point point = new Point(54.3438782, 48.3634633);
        System.out.println(file.getAbsolutePath());

        try {
            Point metadata = Metadata.metadata(file);
            assertEquals(point, Metadata.metadata(file));
            System.out.println("    " + "GPS Description: ");
            System.out.println("    " + "GPS Широта(Longitude): " + metadata.getLongitude());
            System.out.println("    " + "GPS Долгота(Latitude): " + metadata.getLatitude());
        } catch (Throwable t) {
            log.error("MetadataTest error", t.getMessage());
        }
    }
}
