
import React, { useState } from 'react'
import { LineLayer, ShapeSource } from '@rnmapbox/maps'

interface Props {
    directionCoordinate: any
}
const Direction = ({ directionCoordinate }: Props) => {
    
    return (
        <ShapeSource
            id="routeSource"
            lineMetrics
            shape={{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: directionCoordinate,
                },
                properties: {},
            }}

        >
            <LineLayer
                id="exampleLineLayer"
                style={{
                    lineColor: 'black',
                    lineCap: 'round',
                    lineJoin: 'round',
                    lineWidth: 4,
                }}
            />
        </ShapeSource >
    )
}

export default Direction