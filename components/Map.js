import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin, selectDestination } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import axios from 'axios'
import { setTravelTimeInformation } from '../slices/navSlice'

const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null) 
    const dispatch = useDispatch();
   useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
        //call distance matrix api using axios
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        axios.get(URL)
        .then((response) => {
            dispatch(setTravelTimeInformation(response.data.rows[0].elements[0]))
            console.log(response.data.rows[0].elements[0])
        })
        .catch((error) => {
            console.log(error)
        })
    }
    getTravelTime();

   }, [origin, destination, GOOGLE_MAPS_APIKEY])


    useEffect(() => {
        if (!origin || !destination) return;
        // Zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        })
    }, [origin, destination])
  return (
        <View style={tw`flex-1`}>
            
        <MapView
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>
            {destination && origin && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location &&
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title={"Your Location"}
                    description={origin.description}
                    identifier="origin"
                />
            }
            {destination?.location &&
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title={"Your Destination"}
                    description={destination.description}
                    identifier="origin"
                />
            }
            </MapView>
        </View>
  )
}

export default Map

const styles = StyleSheet.create({})