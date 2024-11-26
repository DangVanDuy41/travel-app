import React, { Dispatch, useEffect, useRef, useState } from 'react';
import Mapbox, { Camera, LocationPuck, MapView, ShapeSource, SymbolLayer, Images, LineLayer, MapState } from '@rnmapbox/maps';
import { featureCollection } from '@turf/helpers';
import Direction from './Direction';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAP_KEY!)

interface Props {
    flyToLocation?: { lat: number, lon: number } | undefined
    onPointPress?: (event: any) => Promise<void>;
    points?: any[];
    directionCoordinate?: any;
    isfolowUser?: boolean
    setIsFolowUser?: Dispatch<React.SetStateAction<boolean>>
}

const MarkerIcon = require('../assets/images/Marker.png');

const Map = ({ onPointPress, points, directionCoordinate, flyToLocation, isfolowUser, setIsFolowUser }: Props) => {

    const cameraRef = useRef<Camera>(null);
    const [, setIsGestureActive] = useState(isfolowUser || false);

    const isUpdating = useRef(false);

    const onCameraChanged = (e: MapState) => {
        if (isUpdating.current) return;

        const { isGestureActive } = e.gestures;
        isUpdating.current = true;

        setIsGestureActive((prev) => {
            if (prev !== isGestureActive) {
                return isGestureActive;
            }
            return prev;
        });

        if (setIsFolowUser) {
            setIsFolowUser((prev) => {
                const newFollowUserState = !isGestureActive;
                if (prev !== newFollowUserState) {
                    return newFollowUserState;
                }
                return prev;
            });
        }

        // Reset cờ sau một thời gian ngắn
        setTimeout(() => {
            isUpdating.current = false;
        }, 1000); // Thời gian debounce tùy chỉnh
    };


    useEffect(() => {
        if (flyToLocation) {
            cameraRef.current?.setCamera({
                centerCoordinate: [flyToLocation.lon, flyToLocation.lat],
                zoomLevel: 16,
                animationDuration: 5000,
                animationMode: 'flyTo',

            });
        }
    }, [flyToLocation])

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                styleURL='mapbox://styles/mapbox/streets-v12'
                onCameraChanged={onCameraChanged}
            >
                <Camera
                    followUserLocation={isfolowUser}
                    followZoomLevel={16}
                    ref={cameraRef}

                />

                <LocationPuck
                    puckBearingEnabled
                    puckBearing='heading'
                    pulsing={{ isEnabled: true }}
                />

                <ShapeSource
                    id='marker'
                    onPress={onPointPress}
                    shape={featureCollection(points || [])}
                >
                    <SymbolLayer
                        id="symbolLocationSymbols"
                        minZoomLevel={1}
                        style={{
                            iconImage: 'MarkerIcon',
                            iconAllowOverlap: true,
                            iconSize: 0.1,
                            iconAnchor: 'bottom',
                        }}
                    />

                    <Images images={{ MarkerIcon }} />
                </ShapeSource>
                {directionCoordinate && (
                    <Direction directionCoordinate={directionCoordinate} />
                )}



            </MapView>

        </>

    );
};



export default Map;